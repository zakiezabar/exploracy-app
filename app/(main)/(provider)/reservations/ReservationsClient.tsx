'use client';

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { SafeReservation, SafeUser } from "@/app/types";

import Heading from "@/components/Heading";
import Container from "@/components/Container";
import ListingCardList from "@/components/listings/ListingCardList";

interface ReservationsClientProps {
  reservations: SafeReservation[];
  currentUser?: SafeUser | null;
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
  reservations,
  currentUser
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback(async (id: string) => {
    try {
      setDeletingId(id);

      const reservation = reservations.find(r => r.id === id);
      if (!reservation) return;

      // Show appropriate confirmation message
      const message = reservation.paymentStatus === "paid"
        ? "Are you sure you want to cancel this reservation? This will process a refund."
        : "Are you sure you want to cancel this reservation?";

      if (!window.confirm(message)) {
        return;
      }

      await axios.delete(`/api/reservations/${id}`)
    //   .then(() => {
    //     toast.success("Reservation cancelled");
    //     router.refresh();
    //   })
    //   .catch(() => {
    //     toast.error("Something went wrong.");
    //   })
    //   .finally(() => {
    //     setDeletingId('');
    //   })
    // }, [router]);
      const successMessage = reservation.paymentStatus === "paid"
        ? "Reservation cancelled and refund processed"
        : "Reservation cancelled successfully";

      toast.success(successMessage);
      router.refresh();
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "Error cancelling reservation");
    } finally {
      setDeletingId('');
    }
  }, [router, reservations]);
  
  return ( 
    <Container>
      <div className="pt-4">
        <Heading
          title="Reservations"
          subtitle="Bookings on your properties"
        />
        <div className="mt-10 flex flex-col pb-28">
          {reservations.map((reservation) => (
            <ListingCardList
              key={reservation.id}
              data={reservation.listing}
              reservation={reservation}
              actionId={reservation.id}
              onAction={onCancel}
              disabled={
                deletingId === reservation.id || 
                reservation.bookingStatus === "cancelled"
              }
              actionLabel={
                reservation.bookingStatus === "cancelled"
                  ? "Cancelled"
                  : deletingId === reservation.id 
                    ? "Processing..."
                    : "Cancel reservation"
              }
              currentUser={currentUser}
            />
          ))}
        </div>
      </div>
    </Container>
   );
}
 
export default ReservationsClient;