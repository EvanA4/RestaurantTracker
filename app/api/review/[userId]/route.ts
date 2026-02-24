// /api/review/{userID}

import ReviewModel, { ReviewDocument } from "@/models/Review";
import TagModel, { TagDocument } from "@/models/Tag";
import { IImage } from "@/types/imagedb/image";
import { EDietRestriction } from "@/types/tag";
import dbConnect from "@/utils/dbconnect";
import { getRestaurantById } from "@/utils/handlers/restaurant";
import { getUserById } from "@/utils/handlers/users";
import { startSession } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

/*
THINGS TO VERIFY:
images
description
rating
tags
userId
restaurantId
*/

// [POST] Add a review under userID with data in body
export const POST = async function (
  req: NextRequest,
  { params }: { params: { userId: string } },
) {
  await dbConnect();
  const { userId } = await params;
  let in_fd: FormData;
  try {
    in_fd = await req.formData();
  } catch {
    return NextResponse.json(
      { message: "Missing or invalid body type" },
      { status: 400 },
    );
  }

  // images are optional

  // descripton
  const descArr = in_fd.getAll("description");
  if (descArr.length == 0 || !descArr[0]) {
    return NextResponse.json(
      { message: "Description is required" },
      { status: 400 },
    );
  }

  // rating must be float within [0,5] and multiple of .5
  const ratingArr = in_fd.getAll("rating");
  if (ratingArr.length == 0 || !ratingArr[0]) {
    return NextResponse.json(
      { message: "Rating is required" },
      { status: 400 },
    );
  }
  let rating: number;
  try {
    rating = parseFloat(ratingArr[0] as string);
    if (rating < 0 || rating > 5 || rating % 0.5 != 0) {
      return NextResponse.json(
        { message: "Rating must be decimal within [0,5] and multiple of .5" },
        { status: 400 },
      );
    }
  } catch {
    return NextResponse.json(
      { message: "Rating must be decimal within [0,5] and multiple of .5" },
      { status: 400 },
    );
  }

  // tags are optional

  // userId must be valid
  const isUser = (await getUserById(userId)) != undefined;
  if (!isUser) {
    return NextResponse.json(
      { message: "User ID is invalid" },
      { status: 400 },
    );
  }

  // restaurantId must be valid
  const restIdArr = in_fd.getAll("restaurantId");
  if (restIdArr.length == 0 || !restIdArr[0]) {
    return NextResponse.json(
      { message: "Restaurant ID is required" },
      { status: 400 },
    );
  }
  const isRestaurant =
    (await getRestaurantById(restIdArr[0] as string)) != undefined;
  if (!isRestaurant) {
    return NextResponse.json(
      { message: "Restaurant ID is invalid" },
      { status: 400 },
    );
  }

  // Actually create the review, tags, and images
  const toCreate = {
    description: descArr[0] as string,
    rating: rating,
    userId: userId,
    restaurantId: restIdArr[0] as string,
  };

  let review: ReviewDocument | undefined = undefined;
  const tags: TagDocument[] = [];
  const images: IImage[] = [];
  let didError = false;

  const session = await startSession(); // begin transaction
  try {
    await session.withTransaction(async () => {
      // create review
      review = (await ReviewModel.create(toCreate)) as ReviewDocument;

      // create tags
      const tagsToCreate = in_fd.getAll("tags");
      for (let i = 0; i < tagsToCreate.length; ++i) {
        tags.push(
          await TagModel.create({
            reviewId: review._id.toString(),
            restaurantId: toCreate.restaurantId,
            label: tagsToCreate[i] as unknown as EDietRestriction,
          }),
        );
      }

      // create images
      const imagesToCreate = in_fd.getAll("images");
      for (const idx in imagesToCreate) {
        const tmp_fd = new FormData();
        tmp_fd.append("images", imagesToCreate[idx]);
        tmp_fd.append("password", process.env.IMAGEDB_PASS!);
        tmp_fd.append("reviewId", review._id.toString());
        const rawRes = await fetch(`${process.env.IMAGEDB_HOST}/images`, {
          method: "POST",
          body: tmp_fd,
        });
        const res = await rawRes.json();
        if (res.uploaded && res.uploaded[0]) {
          images.push(res.uploaded[0]);
        }
      }
    });
  } catch (err) {
    console.log(err);

    // delete images if things go wrong
    for (let i = 0; i < images.length; ++i) {
      await fetch(`${process.env.IMAGEDB_HOST}/images?${images[i]._id!}`, {
        method: "DELETE",
        body: JSON.stringify({
          password: process.env.IMAGEDB_PASS,
        }),
        headers: {
          "Content-Type": "application/json", // Not including this causes NGINX to ignore DELETE requests' bodies
        },
      });
    }

    didError = true;
  } finally {
    session.endSession(); // end transaction
  }

  if (didError || !review) {
    return NextResponse.json({
      message: "Failed to create a review",
    });
  }

  review = review as ReviewDocument;
  return NextResponse.json({
    message: "Successfully created a review",
    review: {
      userId: review.userId,
      restaurantId: review.restaurantId,
      rating: review.rating,
      description: review.description,
      _id: review._id,
      tags,
      images,
    },
  });
};

// [GET] Get list of all existing review IDs from userID
export const GET = async function (
  req: NextRequest,
  { params }: { params: { userId: string } },
) {
  await dbConnect();
  const { userId } = await params;
  const searchParams = req.nextUrl.searchParams; // use for optional restaurantId query
  const restaurantId = searchParams.get("restaurantId");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  let reviews: ReviewDocument[];

  if (!restaurantId) {
    reviews = (await ReviewModel.find({
      userId,
    })) as ReviewDocument[];
  } else {
    reviews = (await ReviewModel.find({
      userId,
      restaurantId,
    })) as ReviewDocument[];
  }

  return NextResponse.json({
    message: "Successfully got all reviews",
    reviews,
  });
};
