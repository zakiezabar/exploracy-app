'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Container from '@/components/Container';
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

const SuccessPageContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const verifyPayment = async () => {
      const sessionId = searchParams?.get('session_id');
      
      if (!sessionId) {
        toast.error('No session ID found');
        router.push('/');
        return;
      }

      try {
        const response = await fetch('/api/payment/verify-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sessionId }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Verification failed');
        }

        toast.success('Payment confirmed!');
        
        // Redirect to trips page after 3 seconds
        setTimeout(() => {
          router.push('/bookings');
        }, 3000);
      } catch (error) {
        console.error('Verification error:', error);
        toast.error('Failed to verify payment');
      } finally {
        setIsProcessing(false);
      }
    };

    verifyPayment();
  }, [searchParams, router]);

  return (
    <Container>
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
          {isProcessing ? (
            <>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Processing your payment...
              </h1>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            </>
          ) : (
            <>
              <div className="text-green-500 text-5xl mb-4">✓</div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Payment Successful!
              </h1>
              <p className="text-gray-600 mb-6">
                Your reservation has been confirmed.
              </p>
              <p className="text-sm text-gray-500">
                Redirecting to your trips page...
              </p>
            </>
          )}
        </div>
      </div>
    </Container>
  );
};

export default function SuccessPage() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <SuccessPageContent />
    </Suspense>
  );
}