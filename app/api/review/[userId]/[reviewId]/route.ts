// /api/review/{userID}/{reviewID}

import ReviewModel from "@/models/Review";
import dbConnect from "@/utils/dbconnect";
import { NextRequest, NextResponse } from "next/server";

// [PUT] Modify review with review ID and userID using body data
export const PUT = async function (
  req: NextRequest,
  { params }: { params: { userId: string; reviewId: string } },
) {
  await dbConnect();
  const { userId, reviewId } = params;
  const body = await req.json();
  const { rating, description } = body;

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  if (!reviewId) {
    return NextResponse.json(
      { error: "Review ID is required" },
      { status: 400 },
    );
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

  const review = await ReviewModel.findOneAndUpdate({
    ...body,
    userId: userId,
    _id: reviewId,
  });

  return NextResponse.json({
    message: "Successfully modified a review",
    review,
  });
};

// [DELETE] Delete review under userID with reviewID
export const DELETE = async function (
  req: NextRequest,
  { params }: { params: { userId: string; reviewId: string } },
) {
  await dbConnect();
  const { userId, reviewId } = params;

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  if (!reviewId) {
    return NextResponse.json(
      { error: "Review ID is required" },
      { status: 400 },
    );
  }

  const review = await ReviewModel.findOneAndDelete({
    reviewId: reviewId,
  });

  return NextResponse.json({
    message: "Successfully deleted a review",
    review,
  });
};
