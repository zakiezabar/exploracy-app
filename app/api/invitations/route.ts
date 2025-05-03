import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { Resend } from "resend";
import getCurrentUser from "@/app/actions/getCurrentUser";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const currentUserData = await getCurrentUser();

    if (!currentUserData?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { listingId, emails } = body;

    // Verify the listing exists and belongs to the current user
    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
        userId: currentUserData.id,
      },
    });

    if (!listing) {
      console.error("Listing not found:", listingId);
      return NextResponse.json({ error: "Listing not found" }, { status: 404 });
    }

    console.log("Found listing:", listing.title);

    const invitations = await Promise.all(
      emails.map(async (email: string) => {
        try {
          const token = crypto.randomUUID();
          const expiresAt = new Date();
          expiresAt.setDate(expiresAt.getDate() + 7);

          console.log("Creating invitation for:", email);

          const invitation = await prisma.invitation.create({
            data: {
              email,
              token,
              listingId,
              expiresAt,
            },
          });

          console.log("Created invitation:", invitation);

          // Send invitation email
          console.log("Attempting to send email with Resend...");
          const emailResponse = await resend.emails.send({
            from: "Exploracy <noreply@exploracy.com>",
            to: email,
            subject: "You've been invited to join an activity!",
            html: `
              <h1>You've been invited to join an activity!</h1>
              <p>You've been invited to join "${listing.title}"</p>
              <p>Click the button below to view and accept the invitation:</p>
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/invitation/${token}" 
                 style="background-color: #0070f3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 16px 0;">
                View Invitation
              </a>
              <p>This invitation will expire in 7 days.</p>
            `,
          });

          console.log("Email sent successfully:", emailResponse);

          return invitation;
        } catch (error) {
          console.error("Error processing invitation for email:", email, error);
          throw error;
        }
      })
    );

    return NextResponse.json(invitations);
  } catch (error) {
    console.error("Error creating invitations:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
