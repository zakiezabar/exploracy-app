import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function GET(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.json(
            { error: "User ID is required" },
            { status: 400 } // Bad Request
        );
    }

    const user = await prisma.user.findUnique({
      where: { id: currentUser.id },
      select: { points: true },
    });

    if (!user) {
        return NextResponse.json(
            { error: "User not found" },
            { status: 404 } // Not Found
        );
    }

    return NextResponse.json({ points: user.points }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user points:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 } // Internal Server Error
    );
  }
}
