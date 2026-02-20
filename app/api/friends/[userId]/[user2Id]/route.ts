import FriendModel from "@/models/Friend";
// import UserModel from "@/models/User";
import dbConnect from "@/utils/dbconnect";
import { NextRequest, NextResponse } from "next/server";

// Get the friend relationship between two users
export const GET = async function (
  req: NextRequest,
  { params }: { params: { userId: string; user2Id: string } },
) {
  await dbConnect();

  if (!params.userId)
    return NextResponse.json({ message: "User ID required" }, { status: 400 });

  const friend = await FriendModel.find({
    $or: [
      { requestorId: params.userId, receiverId: params.user2Id },
      { requestorId: params.user2Id, receiverId: params.userId },
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
  { params }: { params: { userId: string; user2Id: string } },
) {
  await dbConnect();

  // verify that both userId and user2Id are present
  if (!params.userId || !params.user2Id)
    return NextResponse.json(
      { message: "Requestor User ID and Receiver User ID required" },
      { status: 400 },
    );

  // verify that the requestor and receiver user IDs are not the same
  if (params.userId == params.user2Id)
    return NextResponse.json(
      { message: "Requestor and Receiver User IDs cannot be the same" },
      { status: 400 },
    );

  // verify that the users exist in the database
  // const user = await UserModel.findOne({ _id: params.userId });
  // if (!user)
  //   return NextResponse.json({ message: "User not found" }, { status: 404 });

  // const user2 = await UserModel.findOne({ _id: params.user2Id });
  // if (!user2)
  //   return NextResponse.json({ message: "User not found" }, { status: 404 });

  // verify that the friend relationship does not already exist
  const existing = await FriendModel.findOne({
    $or: [
      { requestorId: params.userId, receiverId: params.user2Id },
      { requestorId: params.user2Id, receiverId: params.userId },
    ],
  });
  if (existing)
    return NextResponse.json(
      { message: "Friend relationship already exists" },
      { status: 400 },
    );

  const friend = await FriendModel.insertOne({
    requestorId: params.userId,
    receiverId: params.user2Id,
    status: false,
  });

  if (!friend)
    return NextResponse.json({ message: "Friend not found" }, { status: 404 });

  return NextResponse.json(friend, { status: 200 });
};
