import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import ClientOnly from "@/components/ClientOnly";
// import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";
import getReservations from "@/app/actions/getReservations";
import { notFound } from "next/navigation"; // Import `notFound` from Next.js


interface IParams {
    listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
    // const listing = await getListingById(params);
    const { listingId } = params;

     // Check if listingID exists
     if (!listingId) {
        notFound(); // Use Next.js built-in `notFound` for 404 handling
    }

    const listing = await getListingById({ listingId });
    const reservations = await getReservations({ listingId });
    const currentUser = await getCurrentUser();

    // If the listing is not found, return a 404 page
    if (!listing) {
        notFound(); // Use Next.js built-in `notFound` for 404 handling
    }

    return ( 
        <ClientOnly>
            <ListingClient
                listing={listing}
                reservations={reservations}
                currentUser={currentUser}
            />
            
        </ClientOnly>
     );
}
 
export default ListingPage;