"use client";

import { useRouter } from "next/navigation";

import { SafeUser, SafeListing } from "@/app/types"; // Type definitions for user and listing data
import Image from "next/image"; // Next.js optimized image component
import Container from "@/components/Container"; // Layout wrapper component
import ListingCard from "@/components/listings/ListingCard"; // Card component for activities
import { format } from "date-fns"; // Date formatting utility
import EmptyState from "@/components/EmptyState"; // Component for empty states
import { useRef } from "react"; // React hook for maintaining references
import { MoveLeft, MoveRight } from "lucide-react";
import BackButton from "@/components/BackButton";

// Define props interface with types
interface UserClientProps {
  user: SafeUser & {
    // User data with listings array
    listings: SafeListing[];
  };
  activitiesJoined: number; // Number of activities user joined
  currentUser: SafeUser | null; // Currently logged in user
}

// React functional component with TypeScript typing
const UserClient: React.FC<UserClientProps> = ({
  user,
  activitiesJoined,
  currentUser,
}) => {
  const router = useRouter();
  // Reference to scrollable container
  const scrollRef = useRef<HTMLDivElement>(null);

  // Function to handle horizontal scrolling
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 340; // Card width + gap
      const scrollLeft =
        direction === "left"
          ? current.scrollLeft - scrollAmount // Scroll left
          : current.scrollLeft + scrollAmount; // Scroll right

      current.scrollTo({
        left: scrollLeft,
        behavior: "smooth", // Smooth scrolling animation
      });
    }
  };

  // Show empty state if no user found
  if (!user) {
    return <EmptyState title="No user found" subtitle="Try going back" />;
  }

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <BackButton showBackArrow />
        <div className="flex flex-col gap-6">
          {/* User Profile Section */}
          <div className="flex items-center gap-4 p-4 border-b border-mono-200">
            {/* Profile Image */}
            <div className="relative h-24 w-24">
              <Image
                src={user.image || "/images/placeholder.png"}
                alt="Avatar"
                className="rounded-full object-cover border-4 border-secondary-100"
                fill
              />
            </div>

            {/* User Info Section */}
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-mono-400 text-sm">
                Joined {format(new Date(user.createdAt), "MMMM yyyy")}
              </p>

              {/* User Statistics */}
              <div className="flex gap-4 text-sm">
                <div>
                  <span className="font-semibold">{user.points}</span> points
                </div>
                <div>
                  <span className="font-semibold">{activitiesJoined}</span>{" "}
                  activities joined
                </div>
                <div>
                  <span className="font-semibold">{user.listings.length}</span>{" "}
                  activities created
                </div>
              </div>
            </div>
          </div>

          {/* Activities Section */}
          <div className="relative">
            <h2 className="text-xl font-semibold mb-4">Activities Created</h2>
            {/* Show empty state or activities slider */}
            {user.listings.length === 0 ? (
              <EmptyState
                title="No activities found"
                subtitle="Looks like this user hasn't created any activities yet."
              />
            ) : (
              <div className="relative">
                {/* Gradient Overlays */}
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />
                {/* Horizontal Scrollable Container */}
                <div
                  className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide px-12"
                  ref={scrollRef}
                  style={{ scrollBehavior: "smooth" }}
                >
                  {/* Map through listings to create cards */}
                  {user.listings.map((listing) => (
                    <div key={listing.id} className="flex-none w-80">
                      <ListingCard data={listing} currentUser={currentUser} />
                    </div>
                  ))}
                </div>

                {/* Navigation Buttons - only show if more than 3 listings */}
                {user.listings.length > 3 && (
                  <div className="absolute top-1/2 -translate-y-1/2 flex justify-between w-full px-4 pointer-events-none z-20">
                    {/* Left scroll button */}
                    <button
                      onClick={() => scroll("left")}
                      className="bg-white p-2 rounded-full shadow-md hover:scale-110 transition pointer-events-auto flex items-center justify-center"
                    >
                      <MoveLeft size={24} />
                    </button>
                    <button
                      onClick={() => scroll("right")}
                      className="bg-white p-2 rounded-full shadow-md hover:scale-110 transition pointer-events-auto flex items-center justify-center"
                    >
                      <MoveRight size={24} />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default UserClient;
