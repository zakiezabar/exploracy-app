import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY');
}

// Initialize Stripe with the secret key and correct API version
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-11-20.acacia", // Update to match your version
});

export async function POST(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    
    if (!currentUser) {
      return NextResponse.json(
        { error: "Unauthorized" }, 
        { status: 401 }
      );
    }

    // Parse and validate request body
    const body = await req.json();
    console.log('Received request body:', body);

    const { listingId, startDate, endDate, totalPrice } = body;
    
    // Validate required fields
    if (!listingId) {
      return NextResponse.json(
        { error: "listingId is required" }, 
        { status: 400 }
      );
    }

    if (!startDate || !endDate) {
      return NextResponse.json(
        { error: "startDate and endDate are required" }, 
        { status: 400 }
      );
    }

    if (!totalPrice || totalPrice <= 0) {
      return NextResponse.json(
        { error: "Valid totalPrice is required" }, 
        { status: 400 }
      );
    }

    // Verify the listing exists
    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
    });

    if (!listing) {
      return NextResponse.json(
        { error: `Listing with id ${listingId} not found` }, 
        { status: 404 }
      );
    }

    const origin = req.headers.get("origin") || "http://localhost:3000";

    // Create reservation with error handling
    let reservation;
    try {
      reservation = await prisma.reservation.create({
        data: {
          userId: currentUser.id,
          listingId: listingId,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          totalPrice,
          paymentStatus: "pending"
        }
      });
    } catch (error) {
      console.error('Reservation creation error:', error);
      return NextResponse.json(
        { error: "Failed to create reservation" }, 
        { status: 500 }
      );
    }

    // Create Stripe session with error handling
    let session;
    try {
      session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        metadata: {
          reservationId: reservation.id,
          userId: currentUser.id
        },
        line_items: [
          {
            price_data: {
              currency: "myr",
              product_data: {
                name: listing.title,
                description: `Booking from ${startDate} to ${endDate}`,
              },
              unit_amount: totalPrice * 100,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${origin}/listings/payment/bookings/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/listings/payment/bookings/cancelled?reservation_id=${reservation.id}`,
      });
    } catch (error) {
      // If Stripe session creation fails, delete the reservation
      await prisma.reservation.delete({
        where: { id: reservation.id }
      });
      
      console.error('Stripe session creation error:', error);
      return NextResponse.json(
        { error: "Failed to create payment session" }, 
        { status: 500 }
      );
    }

    // Update reservation with payment ID
    try {
      await prisma.reservation.update({
        where: { id: reservation.id },
        data: { paymentId: session.id }
      });
    } catch (error) {
      console.error('Reservation update error:', error);
      // Continue anyway since the session was created
    }

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Checkout session error:', error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}