import FriendModel from "@/models/Friend";
import dbConnect from "@/utils/dbconnect";
import { NextRequest, NextResponse } from "next/server";

// accept an existing friend request
export const PUT = async function (
  req: NextRequest,
  { params }: { params: { friendRequestId: string } },
) {
  await dbConnect();

  if (!params.friendRequestId)
    return NextResponse.json(
      { message: "Friend ID required" },
      { status: 400 },
    );

  const friend = await FriendModel.findOneAndUpdate(
    { _id: params.friendRequestId },
    { status: true },
    { new: true },
  );

  if (!friend)
    return NextResponse.json({ message: "Friend not found" }, { status: 404 });

  return NextResponse.json(friend, { status: 200 });
};

// unsending a friend request or denying a friend request
export const DELETE = async function (
  req: NextRequest,
  { params }: { params: { friendRequestId: string } },
) {
  await dbConnect();

  if (!params.friendRequestId)
    return NextResponse.json(
      { message: "Friend ID required" },
      { status: 400 },
    );

  const friend = await FriendModel.findOneAndDelete({
    _id: params.friendRequestId,
  });

  if (!friend)
    return NextResponse.json({ message: "Friend not found" }, { status: 404 });

  return NextResponse.json(friend, { status: 200 });
};
