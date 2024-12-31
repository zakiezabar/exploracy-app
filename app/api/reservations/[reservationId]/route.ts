import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import Stripe from "stripe";

// Initialize Stripe with the secret key and correct API version
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-11-20.acacia", // Update to match your version
});

interface IParams {
  reservationId?: string;
};

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { reservationId } = params;

  if (!reservationId || typeof reservationId !== 'string') {
    throw new Error('Invalid ID');
  }

  try {
    // First get the reservation to check payment status
    const reservation = await prisma.reservation.findUnique({
      where: { id: reservationId }
    });

    if (!reservation) {
      throw new Error('Reservation not found');
    }

    // If payment exists and status is "paid", process refund
    if (reservation.paymentId && reservation.paymentStatus === "paid") {
      try {
        const session = await stripe.checkout.sessions.retrieve(reservation.paymentId);
        
        if (session.payment_intent) {
          await stripe.refunds.create({
            payment_intent: session.payment_intent as string,
          });
        }
      } catch (error) {
        console.error('Refund failed:', error);
        throw new Error('Refund processing failed');
      }
    }

    // Update reservation status to cancelled
    const cancelledReservation = await prisma.reservation.updateMany({
      where: {
        id: reservationId,
        OR: [
          { userId: currentUser.id },
          { listing: { userId: currentUser.id } }
        ]
      },
      data: {
        bookingStatus: "cancelled",
        paymentStatus: "cancelled"
      }
    });

    return NextResponse.json(cancelledReservation);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: (error as Error).message }, 
      { status: 500 }
    );
  }
}