'use client';

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import Container from "@/components/Container";
import Heading from "@/components/Heading";
import { SafeUser, SafeListing } from "@/app/types";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "@/components/listings/ListingCard";

interface ActivityListingsProps {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}

const ActivityListings: React.FC<ActivityListingsProps> = ({
  listings,
  currentUser
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback((id: string) => {
    setDeletingId(id);

    axios.delete(`/api/listings/${id}`)
    .then(() => {
      toast.success('Listing deleted');
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
          title="My activities"
          subtitle="List of your activities"
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
          {listings.map((listing) => (
            <ListingCard
              key={listing.id}
              data={listing}
              actionId={listing.id}
              onAction={onCancel}
              disabled={deletingId === listing.id}
              actionLabel="Delete activity"
              currentUser={currentUser}
            />
          ))}
        </div>
      </div>
    </Container>
   );
}
 
export default ActivityListings;