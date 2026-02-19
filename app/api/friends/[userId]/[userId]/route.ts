import FriendModel from "@/models/Friend";
import dbConnect from "@/utils/dbconnect";
import { NextRequest, NextResponse } from "next/server";

// Get the friend relationship between two users
export const GET = async function (
  req: NextRequest,
  { params }: { params: { user1Id: string; user2Id: string } },
) {
  await dbConnect();

  if (!params.user1Id)
    return NextResponse.json({ message: "User ID required" }, { status: 400 });

  const friend = await FriendModel.find({
    $or: [
      { requestorId: params.user1Id, receiverId: params.user2Id },
      { requestorId: params.user2Id, receiverId: params.user1Id },
    ],
  });

  if (!friend)
    return NextResponse.json(
      { message: "Friend relationship not found" },
      { status: 404 },
    );

  return NextResponse.json(friend, { status: 200 });
};

// the same as creating a new Friend relationship / sending a friend request
// the first one must be the requestor and the second one must be the receiver
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

  if (params.requestorId == params.receiverId)
    return NextResponse.json(
      { message: "Requestor and Receiver User IDs cannot be the same" },
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
