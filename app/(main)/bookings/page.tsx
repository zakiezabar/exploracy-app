import EmptyState from "@/components/EmptyState";
import ClientOnly from "@/components/ClientOnly";
import BookingsClient from "./BookingsClient";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";

const BookingsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="Unauthorized"
          subtitle="Please login"
        />
      </ClientOnly>
    )
  }

  const reservations = await getReservations({
    userId: currentUser.id
  });

  if (getReservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No trips found"
          subtitle="Looks like you haven't reserved any trips."
        />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
        <BookingsClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  )
}

export default BookingsPage;