import prismadb from "@/app/libs/prismadb";  // Prisma client instance for database operations
import getCurrentUser from "@/app/actions/getCurrentUser";  // Function to get authenticated user
import { SafeUser, SafeListing } from "@/app/types";  // Type definitions for safe data handling
import UserClient from "./UserClient";  // Client component for UI rendering

// Define params interface for the dynamic route
interface IParams {
  userId?: string;  // Optional userId from URL parameter
}

// Server component with async functionality
const UserPage = async ({ params }: { params: IParams }) => {
  // Get currently logged-in user
  const currentUser = await getCurrentUser();
  
  // Fetch user data with related records
  const user = await prismadb.user.findUnique({
    where: {
      id: params.userId  // Find by URL parameter
    },
    include: {  // Include related data
      listings: true,    // User's created activities
      reservations: true,  // User's bookings
      badge: true        // User's badges
    }
  });

  // Handle non-existent user
  if (!user) {
    return <div>User not found</div>;
  }

  // Count user's joined activities
  const activitiesJoined = await prismadb.reservation.count({
    where: {
      userId: params.userId
    }
  });

  // Transform listings to safe format (convert dates to strings)
  const safeListings: SafeListing[] = user.listings.map((listing) => ({
    ...listing,
    createdAt: listing.createdAt.toISOString(),
  }));

  // Transform user data to safe format
  const safeUser: SafeUser & { listings: SafeListing[] } = {
    ...user,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
    emailVerified: user.emailVerified?.toISOString() || null,
    listings: safeListings
  };

  // Render client component with processed data
  return (
    <UserClient 
      user={safeUser}           // Transformed user data
      activitiesJoined={activitiesJoined}  // Activity count
      currentUser={currentUser}  // Logged-in user
    />
  );
};

export default UserPage;