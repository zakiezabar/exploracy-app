import EmptyState from "@/components/EmptyState";
import ClientOnly from "@/components/ClientOnly";
import CreateActivityClient from "./CreateActivityClient";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";

const CreateActivityPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="Unauthorized"
          subtitle="Please login"
        />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({
    authorId: currentUser.id
  });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState 
          title="No reservations found"
          subtitle="Looks like you have no reservations on your activities."
        />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <CreateActivityClient/>
    </ClientOnly>
  )
};

export default CreateActivityPage;