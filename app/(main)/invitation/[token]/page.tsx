// app/invitation/[token]/page.tsx
import { getSession } from 'next-auth/react';
import prisma from '@/app/libs/prismadb';
import InvitationAccept from './components/InvitationAccept';

export default async function InvitationPage({
  params
}: {
  params: { token: string }
}) {
  const session = await getSession();
  
  const invitation = await prisma.invitation.findUnique({
    where: { token: params.token },
    include: { listing: true }
  });

  if (!invitation) {
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-bold text-red-600">Invalid or expired invitation</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <InvitationAccept
        invitation={invitation}
        isSignedIn={!!session}
        userEmail={session?.user?.email}
      />
    </div>
  );
}