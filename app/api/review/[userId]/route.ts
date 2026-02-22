// /api/review/{userID}

import ReviewModel from "@/models/Review";
import { Review } from "@/types/review";
import dbConnect from "@/utils/dbconnect";
import { NextRequest, NextResponse } from "next/server";

// [POST] Add a review under userID with data in body
export const POST = async function (
  req: NextRequest,
  { params }: { params: { userId: string } },
) {
  await dbConnect();
  const { userId } = params;
  const body = await req.json();
  const { rating, description } = body;

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  if (rating == null || typeof rating !== "number") {
    return NextResponse.json({ error: "Rating is required" }, { status: 400 });
  }

  if (description == null || typeof description !== "string") {
    return NextResponse.json(
      { error: "Description is required" },
      { status: 400 },
    );
  }

  const review = await ReviewModel.create({
    ...body,
    userId: userId,
  });

  return NextResponse.json({
    message: "Successfully created a review",
    review,
  });
};

// [GET] Get list of all existing review IDs from userID
export const GET = async function (
  req: NextRequest,
  { params }: { params: { userId: string } },
) {
  await dbConnect();
  const { userId } = params;

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  const reviews = (await ReviewModel.find()) as Review[];

  return NextResponse.json({
    message: "Successfully got all reviews",
    reviews,
  });
};
