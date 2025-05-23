'use client';

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import Container from "@/components/Container";
import Heading from "@/components/Heading";
import { SafeUser, SafeReservation } from "@/app/types";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "@/components/listings/ListingCard";

interface BookingsClientProps {
  reservations: SafeReservation[];
  currentUser?: SafeUser | null;
}

const BookingsClient: React.FC<BookingsClientProps> = ({
  reservations,
  currentUser
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback((id: string) => {
    setDeletingId(id);

    axios.delete(`/api/reservations/${id}`)
    .then(() => {
      toast.success('Reservation cancelled');
      router.refresh();
    })
    .catch((error) => {
      toast.error(error?.response?.data?.error);
    })
    .finally(() => {
      setDeletingId('');
    });
  }, [router]);

  return ( 
    <Container>
      <div className="pt-4">
        <Heading 
          title="My bookings"
          subtitle="Where you've been and where you're going."
        />
        <div
          className="
            mt-10
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
          "
        >
          {reservations.map((reservation) => (
            <ListingCard
              key={reservation.id}
              data={reservation.listing}
              reservation={reservation}
              actionId={reservation.id}
              onAction={onCancel}
              disabled={deletingId === reservation.id}
              actionLabel="Cancel reservation"
              currentUser={currentUser}
            />
          ))}
        </div>
      </div>
    </Container>
   );
}
 
export default BookingsClient;