// app/api/payment/verify-payment/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "@/app/libs/prismadb";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-11-20.acacia", // Update to match your version
});

export async function POST(req: NextRequest) {
  try {
    const { sessionId } = await req.json();
    
    // Verify the session with Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    if (!session) {
      return NextResponse.json(
        { error: "Invalid session" },
        { status: 400 }
      );
    }

    // First find the reservation by paymentId
    const existingReservation = await prisma.reservation.findFirst({
      where: {
        paymentId: sessionId
      }
    });

    if (!existingReservation) {
      return NextResponse.json(
        { error: "Reservation not found" },
        { status: 404 }
      );
    }

    // Then update it using its id
    const updatedReservation = await prisma.reservation.update({
      where: { 
        id: existingReservation.id 
      },
      data: { 
        paymentStatus: "paid"
      },
      include: {
        listing: true
      }
    });

    return NextResponse.json({ reservation: updatedReservation });
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { error: "Payment verification failed" },
      { status: 500 }
    );
  }
}