import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function GET() {
  try {
    const heroListings = await prisma.listing.findMany({
      where: {
        heroEvent: true, // only required field for now
      },
    });

    console.log("Hero listings found:", heroListings); // Should show listings in console

    return NextResponse.json(heroListings);
  } catch (error) {
    console.error("Error fetching hero events:", error);
    return NextResponse.json({ error: "Failed to fetch hero events" }, { status: 500 });
  }
}