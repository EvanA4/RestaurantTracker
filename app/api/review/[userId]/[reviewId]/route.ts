// /api/review/{userID}/{reviewID}

import ReviewModel, { ReviewDocument } from "@/models/Review";
import TagModel, { TagDocument } from "@/models/Tag";
import { IImage } from "@/types/imagedb/image";
import { EDietRestriction } from "@/types/tag";
import dbConnect from "@/utils/dbconnect";
import { getRestaurantById } from "@/utils/handlers/restaurant";
import { getUserById } from "@/utils/handlers/users";
import { startSession } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

// [PUT] Modify review with review ID and userID using body data
export const PUT = async function (
  req: NextRequest,
  { params }: { params: { userId: string; reviewId: string } },
) {
  await dbConnect();
  const { userId, reviewId } = await params;
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

  // title
  const titleArr = in_fd.getAll("title");
  if (titleArr.length == 0 || !titleArr[0]) {
    return NextResponse.json({ message: "Title is required" }, { status: 400 });
  }

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
  const toUpdate = {
    title: titleArr[0] as string,
    description: descArr[0] as string,
    rating: rating,
    userId: userId,
    restaurantId: restIdArr[0] as string,
  };

  let review: ReviewDocument | undefined = undefined;
  const tags: TagDocument[] = [];
  let images: IImage[] = [];
  let didError = false;

  const session = await startSession(); // begin transaction
  try {
    await session.withTransaction(async () => {
      // create review
      review = (await ReviewModel.findByIdAndUpdate(
        reviewId,
        toUpdate,
      )) as ReviewDocument;

      // delete previous tags
      await TagModel.deleteMany({
        reviewId,
      });

      // create tags
      const tagsToCreate = in_fd.getAll("tags");
      for (let i = 0; i < tagsToCreate.length; ++i) {
        tags.push(
          await TagModel.create({
            reviewId: review._id.toString(),
            restaurantId: toUpdate.restaurantId,
            label: tagsToCreate[i] as unknown as EDietRestriction,
          }),
        );
      }

      // delete selected images
      const imagesToDelete = in_fd.getAll("prevImagesToDelete");
      for (const idx in imagesToDelete) {
        await fetch(
          `${process.env.IMAGEDB_HOST}/images?_id=${imagesToDelete[idx]}`,
          {
            method: "DELETE",
            body: JSON.stringify({
              password: process.env.IMAGEDB_PASS,
            }),
            headers: {
              "Content-Type": "application/json", // Not including this causes NGINX to ignore DELETE requests' bodies
            },
          },
        );
      }

      // create images
      const imagesToCreate = in_fd.getAll("images");
      for (const idx in imagesToCreate) {
        const tmp_fd = new FormData();
        tmp_fd.append("images", imagesToCreate[idx]);
        tmp_fd.append("password", process.env.IMAGEDB_PASS!);
        tmp_fd.append("reviewId", review._id.toString());
        await fetch(`${process.env.IMAGEDB_HOST}/images`, {
          method: "POST",
          body: tmp_fd,
        });
      }

      // get final list of images
      const rawRes = await fetch(
        `${process.env.IMAGEDB_HOST}/images?reviewId=${reviewId}`,
      );
      const res = await rawRes.json();
      images = res.images;
    });
  } catch (err) {
    console.log(err);

    // if this goes wrong, db is going to be very sad
    // just call sync as a hail mary
    await fetch(`${process.env.IMAGEDB_HOST}/sync`, {
      method: "POST",
      body: JSON.stringify({
        password: process.env.IMAGEDB_PASS,
      }),
    });

    didError = true;
  } finally {
    session.endSession(); // end transaction
  }

  if (didError || !review) {
    return NextResponse.json({
      message: "Failed to update review",
    });
  }

  review = review as ReviewDocument;
  return NextResponse.json({
    message: "Successfully updated review",
    review: {
      userId: review.userId,
      restaurantId: review.restaurantId,
      rating: toUpdate.rating,
      description: toUpdate.description,
      title: toUpdate.title,
      _id: review._id,
      tags,
      images,
    },
  });
};

// [DELETE] Delete review under userID with reviewID
export const DELETE = async function (
  req: NextRequest,
  { params }: { params: { userId: string; reviewId: string } },
) {
  await dbConnect();
  const { userId, reviewId } = await params;

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  if (!reviewId) {
    return NextResponse.json(
      { error: "Review ID is required" },
      { status: 400 },
    );
  }

  const session = await startSession();
  const review: ReviewDocument | undefined = undefined;
  let numTagsDeleted = 0;
  let numImagesDeleted = 0;
  try {
    await session.withTransaction(async () => {
      await ReviewModel.findByIdAndDelete(reviewId);
      numTagsDeleted = (await TagModel.deleteMany({ reviewId })).deletedCount;
      const rawRes = await fetch(
        `${process.env.IMAGEDB_HOST}/images?reviewId=${reviewId}`,
        {
          method: "DELETE",
          body: JSON.stringify({
            password: process.env.IMAGEDB_PASS,
          }),
          headers: {
            "Content-Type": "application/json", // Not including this causes NGINX to ignore DELETE requests' bodies
          },
        },
      );
      const res = await rawRes.json();
      numImagesDeleted = res.images.length;
    });
  } catch (err) {
    console.log(err);
  } finally {
    session.endSession();
  }

  return NextResponse.json({
    message: `Successfully deleted a review, ${numTagsDeleted} tag(s), and ${numImagesDeleted} image(s)`,
    review,
  });
};
