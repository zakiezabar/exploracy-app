import prisma from "@/app/libs/prismadb";

async function fixHeroEvent() {
  try {
    const result = await prisma.$runCommandRaw({
      update: "Listing",
      updates: [
        {
          q: {
            $or: [
              { heroEvent: { $exists: false } },
              { heroEvent: null }
            ]
          },
          u: { $set: { heroEvent: false } },
          multi: true,
        },
      ],
    });

    console.log("✅ Listings updated:", result);
  } catch (error) {
    console.error("❌ Failed to update listings:", error);
  } finally {
    await prisma.$disconnect();
  }
}

fixHeroEvent();