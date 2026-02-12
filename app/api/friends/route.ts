import FriendModel from "@/models/Friend";
import dbConnect from "@/utils/dbconnect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async function (
  req: NextRequest,
  { params }: { params: { userId: string } },
) {
  await dbConnect();
  const friend = await FriendModel.find({
    $or: [{ requestorId: params.userId }, { receiverId: params.userId }],
  });
  return NextResponse.json(friend, { status: 200 });
};

// the same as creating a new Friend relationship / sending a friend request
export const POST = async function (
  req: NextRequest,
  { params }: { params: { requestorId: string; receiverId: string } },
) {
  await dbConnect();

  const friend = await FriendModel.insertOne({
    requestorId: params.requestorId,
    receiverId: params.receiverId,
    status: false,
  });
  return NextResponse.json(friend, { status: 200 });
};

// accept an existing friend request
export const PUT = async function (
  req: NextRequest,
  { params }: { params: { requestorId: string; receiverId: string } },
) {
  await dbConnect();
  const friend = await FriendModel.findOneAndUpdate(
    { requestorId: params.requestorId, receiverId: params.receiverId },
    { status: true },
    { new: true },
  );
  return NextResponse.json(friend, { status: 200 });
};

// unsending a friend request or denying a friend request
export const DELETE = async function (
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  await dbConnect();

  const friend = await FriendModel.findOneAndDelete({ _id: params.id });
  return NextResponse.json(friend, { status: 200 });
};
