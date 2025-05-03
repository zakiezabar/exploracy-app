// app/api/test-invitation/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    console.log('Attempting to send test invitation to:', email);

    // Create a token
    const token = crypto.randomUUID();

    // Save to database
    const invitation = await prisma.testInvitation.create({
      data: {
        email,
        token,
      },
    });

    console.log('Created test invitation:', invitation);

    // Send email
    const emailResponse = await resend.emails.send({
      from: 'Exploracy <mail@dualiti.dev>',
      to: email,
      subject: 'Test Invitation',
      html: `
        <h1>Test Invitation</h1>
        <p>This is a test invitation email.</p>
        <p>Your invitation token is: ${token}</p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/test-email/verify/${token}" 
           style="background-color: #0070f3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 16px 0;">
          Verify Invitation
        </a>
      `,
    });

    console.log('Email sent successfully:', emailResponse);

    return NextResponse.json({ 
      success: true, 
      invitation,
      emailResponse 
    });

  } catch (error: any) {
    console.error('Error in test invitation:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}