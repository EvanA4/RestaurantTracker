import { getRestaurantById } from "@/utils/handlers/restaurant";
import { NextRequest, NextResponse } from "next/server";

export const GET = async function (
  req: NextRequest,
  { params }: { params: { poiId: string } },
) {
  const { poiId } = await params;
  const restaurant = await getRestaurantById(poiId);
  if (!restaurant) {
    return NextResponse.json(
      {
        message: "Failed to retrieve restaurant.",
      },
      {
        status: 200,
      },
    );
  }

  return NextResponse.json(
    {
      message: "Successfully retrieved restaurant!",
      restaurant,
    },
    {
      status: 200,
    },
  );
};
