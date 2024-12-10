import EmptyState from "@/components/EmptyState";
import ClientOnly from "@/components/ClientOnly";
import ActivityListings from "./activityListingsClient";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getListings from "@/app/actions/getListings";

const MyActivityListings = async () => {
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

  const listings = await getListings({
    userId: currentUser.id
  });

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No activities found"
          subtitle="Looks like you haven't created any activities yet."
        />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <ActivityListings
        listings={listings}
        currentUser={currentUser}
      />
    </ClientOnly>
  )
}

export default MyActivityListings;