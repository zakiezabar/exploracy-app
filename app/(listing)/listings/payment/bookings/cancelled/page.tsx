'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Container from '@/components/Container';
import Button from '@/components/Button';
import toast from 'react-hot-toast';

const LoadingSkeleton = () => (
  <Container>
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
          <div className="h-12 w-12 rounded-full bg-gray-200 mx-auto"></div>
        </div>
      </div>
    </div>
  </Container>
);

const CancelledPageContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const updatePaymentStatus = async () => {
      const reservationId = searchParams?.get('reservation_id');
      
      if (!reservationId) {
        toast.error('No reservation found');
        router.push('/');
        return;
      }

      try {
        const response = await fetch('/api/payment/cancel-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ reservationId }),
        });

        if (!response.ok) {
          throw new Error('Failed to update payment status');
        }

        toast.success('Reservation cancelled');
      } catch (error) {
        console.error('Error updating cancelled status:', error);
        toast.error('Something went wrong');
      } finally {
        setIsProcessing(false);
      }
    };

    updatePaymentStatus();
  }, [searchParams, router]);

  return (
    <Container>
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
          {isProcessing ? (
            <>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Processing cancellation...
              </h1>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            </>
          ) : (
            <>
              <div className="text-red-500 text-5xl mb-4">×</div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Reservation Cancelled
              </h1>
              <p className="text-gray-600 mb-6">
                Your reservation has been cancelled successfully.
              </p>
              <Button 
                label="Return to Home" 
                onClick={() => router.push('/')} 
              />
            </>
          )}
        </div>
      </div>
    </Container>
  );
};

export default function CancelledPage() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <CancelledPageContent />
    </Suspense>
  );
}