// app/api/payment/cancel-payment/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(req: NextRequest) {
  try {
    const { reservationId } = await req.json();

    if (!reservationId) {
      return NextResponse.json(
        { error: "Reservation ID is required" },
        { status: 400 }
      );
    }

    // Update the reservation status to cancelled
    const updatedReservation = await prisma.reservation.update({
      where: { 
        id: reservationId 
      },
      data: { 
        paymentStatus: "cancelled"
      }
    });

    return NextResponse.json({ success: true, reservation: updatedReservation });
  } catch (error) {
    console.error('Cancel payment error:', error);
    return NextResponse.json(
      { error: "Failed to update payment status" },
      { status: 500 }
    );
  }
}