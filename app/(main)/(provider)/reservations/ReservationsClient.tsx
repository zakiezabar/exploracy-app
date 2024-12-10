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

  const onCancel = useCallback((id: string) => {
    setDeletingId(id);

    axios.delete(`/api/reservations/${id}`)
    .then(() => {
      toast.success("Reservation cancelled");
      router.refresh();
    })
    .catch(() => {
      toast.error("Something went wrong.");
    })
    .finally(() => {
      setDeletingId('');
    })
  }, [router]);

  return ( 
    <Container>
      <div className="pt-4">
        <Heading
          title="Reservations"
          subtitle="Bookings on your properties"
        />
        <div
          className="
            mt-10
            flex
            flex-col
            pb-28
          "
        >
          {reservations.map((reservation) => (
            <ListingCardList
              key={reservation.id}
              data={reservation.listing}
              reservation={reservation}
              actionId={reservation.id}
              onAction={onCancel}
              disabled={deletingId === reservation.id}
              actionLabel="Cancel guest reservation"
              currentUser={currentUser}
            />
          ))}
        </div>
      </div>
    </Container>
   );
}
 
export default ReservationsClient;