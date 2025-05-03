import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface Params {
  params: {
    listingId: string;
  };
}

export async function GET(req: Request, { params }: Params) {
  const { listingId } = params;

  if (!listingId) {
    return new NextResponse("Missing listingId", { status: 400 });
  }

  try {
    const heroDates = await prisma.heroEventDate.findMany({
      where: { listingId },
      orderBy: { startDate: "asc" },
    });

    return NextResponse.json(heroDates);
  } catch (error) {
    console.error("[HERO_DATES_GET_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}