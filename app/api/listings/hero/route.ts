import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function GET() {
  try {
    const heroListings = await prisma.listing.findMany({
      where: {
        heroEvent: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 1, // or more if you want multiple
    });

    return NextResponse.json(
      heroListings.map((listing) => ({
        id: listing.id,
        title: listing.title,
        imageSrc: listing.imageSrc,
        description: listing.description,
      }))
    );
  } catch (error) {
    return new NextResponse("Hero Error Internal Server Error", { status: 500 });
  }
}