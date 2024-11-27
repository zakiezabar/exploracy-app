export const dynamic = "force-dynamic"; // Ensure dynamic rendering

import getCurrentUser from "../actions/getCurrentUser";
import getListings, { IListingsParams } from "../actions/getListings";

import ClientOnly from "../../components/ClientOnly";
import Container from "../../components/Container";
import EmptyState from "../../components/EmptyState";
import ListingCard from "../../components/listings/ListingCard";
import Categories from "../../components/navbar/Categories";
import { Hero } from "@/components/Hero";

interface HomeProps {
  searchParams: IListingsParams;
}

const Home = async ({ searchParams }: HomeProps) => {
  // Fetch data directly in the server component
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <div className="px-4">
        <ClientOnly>
          <Hero />
          <Categories />
          <EmptyState showReset/>
        </ClientOnly>
      </div>
    )
  }

  return (
    <ClientOnly>
      <Hero />
      <Categories />
      <Container>
        <div className="
          pt-4
          grid
          grid-cols-1
          sm:grid-cols-1
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-4
          2xl:grid-cols-5
          gap-8
          pb-16
        ">
          {listings.map((listing) => {
            return (
              <ListingCard 
                currentUser={currentUser}
                key={listing.id}
                data={listing}
              />
            )
          })}
        </div>
      </Container>
    </ClientOnly>
  );
};

export default Home;