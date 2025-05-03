// app/invitation/[token]/components/InvitationAccept.tsx
'use client';

import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface InvitationAcceptProps {
  invitation: any;
  isSignedIn: boolean;
  userEmail?: string | null;
}

const InvitationAccept = ({
  invitation,
  isSignedIn,
  userEmail
}: InvitationAcceptProps) => {
  const router = useRouter();
  const [isAccepting, setIsAccepting] = useState(false);

  const handleAccept = async () => {
    try {
      setIsAccepting(true);
      await fetch('/api/invitations/accept', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: invitation.token }),
      });
      
      router.push(`/listings/${invitation.listingId}`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsAccepting(false);
    }
  };

  if (!isSignedIn) {
    return (
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold">Please sign in to accept the invitation</h1>
        <Button onClick={() => signIn('credentials')}>
          Sign In
        </Button>
      </div>
    );
  }

  if (userEmail !== invitation.email) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-600">
          This invitation was sent to a different email address
        </h1>
      </div>
    );
  }

  return (
    <div className="text-center space-y-4">
      <h1 className="text-2xl font-bold">You&apos;ve been invited!</h1>
      <p>Would you like to join this activity?</p>
      <Button
        onClick={handleAccept}
        disabled={isAccepting}
      >
        {isAccepting ? 'Accepting...' : 'Accept Invitation'}
      </Button>
    </div>
  );
};

export default InvitationAccept;