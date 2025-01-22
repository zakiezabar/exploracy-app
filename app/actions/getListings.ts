import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
    userId?: string;
    category?: string;
}

export default async function getListings(
    params: IListingsParams
) {
    try {
        const {
            userId,
            category
        } = params;

        let query: any = {
            // Always filter for approved listings
            approved: true
        };

        if (userId) {
            query.userId = userId;
        }

        if (category) {
            query.category = category;
        }

        const listings = await prisma.listing.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc'
            }
        });

        const safeListings = listings.map((listing) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString(),
            capacity: listing.guestCount || 1, // Ensure capacity has a default value if null
        }));

        return safeListings;
    } catch (error: any) {
        console.error('Error in getListings:', error);
        throw new Error(error?.message || 'Failed to fetch listings');
    }
}