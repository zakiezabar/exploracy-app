import prisma from "@/app/libs/prismadb";

interface IParams {
    listingId?: string;
}

export default async function getListingById(
    params: IParams
) {
    const { listingId } = params;

    // Return null early if listingId is not provided
    if (!listingId) {
        return null;
    }

    try {
        // const { listingId } = params;
        const listing = await prisma.listing.findUnique({
            where: {
                id: listingId,
            },
            include: {
                user: true, // Include related user data
            },
        });

        // If no listing is found, return null
        if (!listing) {
            return null;
        }

        // Convert date fields to ISO strings for consistency on client-side
        return {
            ...listing,
            createdAt: listing.createdAt.toISOString(),
            user: {
                ...listing.user,
                createdAt: listing.user.createdAt.toISOString(),
                updatedAt: listing.user.updatedAt.toISOString(),
                emailVerified:
                    listing.user.emailVerified?.toISOString() || null,
            }
        };
    } catch ( error: any ) {
        throw new Error(error);
    }
}