import FriendModel from "@/models/Friend";
import dbConnect from "@/utils/dbconnect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async function (
  req: NextRequest,
  { params }: { params: { userId: string } },
) {
  await dbConnect();

  if (!params.userId)
    return NextResponse.json({ message: "User ID required" }, { status: 400 });

  // should this be find by one userId or find by requestorId and receiverId?
  const friend = await FriendModel.find({
    $or: [{ requestorId: params.userId }, { receiverId: params.userId }],
  });

  if (!friend)
    return NextResponse.json({ message: "Friend not found" }, { status: 404 });

  return NextResponse.json(friend, { status: 200 });
};

// the same as creating a new Friend relationship / sending a friend request
export const POST = async function (
  req: NextRequest,
  { params }: { params: { requestorId: string; receiverId: string } },
) {
  await dbConnect();

  if (!params.requestorId || !params.receiverId)
    return NextResponse.json(
      { message: "Requestor User ID and Receiver User ID required" },
      { status: 400 },
    );

  const friend = await FriendModel.insertOne({
    requestorId: params.requestorId,
    receiverId: params.receiverId,
    status: false,
  });

  if (!friend)
    return NextResponse.json({ message: "Friend not found" }, { status: 404 });

  return NextResponse.json(friend, { status: 200 });
};

// accept an existing friend request
export const PUT = async function (
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  await dbConnect();

  if (!params.id)
    return NextResponse.json(
      { message: "Friend ID required" },
      { status: 400 },
    );

  const friend = await FriendModel.findOneAndUpdate(
    { _id: params.id },
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
  { params }: { params: { id: string } },
) {
  await dbConnect();

  if (!params.id)
    return NextResponse.json(
      { message: "Friend ID required" },
      { status: 400 },
    );

  const friend = await FriendModel.findOneAndDelete({ _id: params.id });

  if (!friend)
    return NextResponse.json({ message: "Friend not found" }, { status: 404 });

  return NextResponse.json(friend, { status: 200 });
};
