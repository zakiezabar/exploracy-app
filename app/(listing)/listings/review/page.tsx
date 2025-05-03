"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/Button";
import { useState, useEffect, Suspense } from "react";
import toast from "react-hot-toast";

// Loading skeleton component for better UX
const LoadingSkeleton = () => (
  <div className="max-w-screen-lg mx-auto p-6">
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-12 bg-gray-200 rounded w-full mt-6"></div>
        </div>
      </div>
    </div>
  </div>
);

const ReviewPageContent: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const listingId = searchParams?.get("listingId");
  const price = searchParams?.get("price") || "0";
  const totalPrice = searchParams?.get("totalPrice") || "0";
  const startDate = searchParams?.get("startDate") || "N/A";
  const endDate = searchParams?.get("endDate") || "N/A";

  // Add this to debug the received parameters
  useEffect(() => {
    console.log("Received URL parameters:", {
      listingId,
      price,
      totalPrice,
      startDate,
      endDate,
    });
  }, [listingId, price, totalPrice, startDate, endDate]);

  const handlePayment = async () => {
    try {
      setIsLoading(true);

      // Validate all required fields
      if (!listingId || !startDate || !endDate) {
        toast.error("Missing required booking information");
        return;
      }

      const payloadData = {
        listingId, // Add the listingId to the payload
        startDate,
        endDate,
        totalPrice: parseInt(totalPrice, 10),
        price: parseInt(price, 10),
      };

      // Log the payload being sent
      console.log("Sending payment data:", payloadData);

      const response = await fetch("/api/payment/checkout_sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payloadData),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Error response:", data);
        throw new Error(data.error || "Failed to create checkout session");
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Something went wrong with the payment process");
    } finally {
      setIsLoading(false);
    }
  };

  // Early return if missing essential data
  if (!listingId || !startDate || !endDate) {
    return (
      <div className="p-6">
        <h2 className="text-red-500">
          Error: Missing required booking information
        </h2>
        <Button
          label="Go Back"
          onClick={() => router.back()}
          className="mt-4"
        />
      </div>
    );
  }

  return (
    <div className="w-full mx-auto p-6 bg-mono-300 h-[calc(100vh-96px)]">
      <div className="max-w-screen-lg mx-auto">
        <div className=" bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-6">Review Your Reservation</h1>
          <div className="space-y-4">
            {/* Add this for debugging */}
            <p className="text-sm text-gray-500">Listing ID: {listingId}</p>
            <div className="flex justify-between items-center">
              <span>Price per person:</span>
              <span className="font-medium">MYR {price}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Check-in:</span>
              <span>{new Date(startDate).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Check-out:</span>
              <span>{new Date(endDate).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between items-center pt-4 border-t">
              <span className="font-bold">Total Price:</span>
              <span className="font-bold">MYR {totalPrice}</span>
            </div>
          </div>
          <div className="mt-6">
            <Button
              label={isLoading ? "Processing..." : "Proceed to Payment"}
              onClick={handlePayment}
              disabled={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Wrapper component with Suspense
const ReviewPage: React.FC = () => {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <ReviewPageContent />
    </Suspense>
  );
};

export default ReviewPage;
