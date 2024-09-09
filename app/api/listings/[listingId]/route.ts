import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
// import { error } from "console";

interface IParams {
  listingId?: string;
}

// GET: Fetch a single listing by ID
export async function GET(
  request: Request,
  { params }: { params: IParams }
) {
  const { listingId } = params;

  if (!listingId || typeof listingId !== 'string') {
    return NextResponse.json({ message: 'Invalid listing ID' }, { status: 400 });
  }

  try {
    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true, // Include the user who created the listing
      },
    });

    if (!listing) {
      return NextResponse.json({ message: 'Listing not found' }, { status: 404 });
    }

    return NextResponse.json(listing);
  } catch (error) {
    console.error('Error fetching listing by ID:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== 'string') {
    return NextResponse.json({ message: 'Invalid listing ID' }, { status: 400 });
  }

  try {
    const listing = await prisma.listing.deleteMany({
      where: {
        id: listingId,
        userId: currentUser.id,
      },
    });

    return NextResponse.json(listing);
  } catch (error) {
    console.error('Error deleting listing:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}