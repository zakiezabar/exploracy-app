// app/api/invitations/accept/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import { getSession } from 'next-auth/react';

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { token } = body;

    const invitation = await prisma.invitation.findUnique({
      where: { token },
    });

    if (!invitation || invitation.status !== 'PENDING') {
      return NextResponse.json(
        { error: 'Invalid invitation' },
        { status: 400 }
      );
    }

    const updatedInvitation = await prisma.invitation.update({
      where: { token },
      data: { status: 'ACCEPTED' },
    });

    return NextResponse.json(updatedInvitation);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}