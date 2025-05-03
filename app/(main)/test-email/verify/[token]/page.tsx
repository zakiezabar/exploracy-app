// app/test-email/verify/[token]/page.tsx
import prisma from '@/app/libs/prismadb';
import { Card } from '@/components/ui/card';

export default async function VerifyPage({
  params
}: {
  params: { token: string }
}) {
  let status = 'pending';
  let message = '';

  try {
    const invitation = await prisma.testInvitation.findUnique({
      where: { token: params.token }
    });

    if (!invitation) {
      status = 'error';
      message = 'Invalid or expired invitation token';
    } else {
      status = 'success';
      message = 'Invitation verified successfully!';

      // Update invitation status
      await prisma.testInvitation.update({
        where: { token: params.token },
        data: { status: 'verified' }
      });
    }
  } catch (error) {
    status = 'error';
    message = 'An error occurred while verifying the invitation';
  }

  return (
    <div className="container mx-auto p-8">
      <Card className="max-w-md mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">
          Invitation Verification
        </h1>
        <p className={`text-${status === 'success' ? 'green' : 'red'}-600`}>
          {message}
        </p>
      </Card>
    </div>
  );
}