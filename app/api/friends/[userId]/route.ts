import FriendModel from "@/models/Friend";
import dbConnect from "@/utils/dbconnect";
import { NextRequest, NextResponse } from "next/server";

// Get all requests sent or received by a user, including those that are accepted
export const GET = async function (
  req: NextRequest,
  { params }: { params: { userId: string } },
) {
  await dbConnect();

  if (!params.userId)
    return NextResponse.json({ message: "User ID required" }, { status: 400 });

  const friend = await FriendModel.find({
    $or: [{ requestorId: params.userId }, { receiverId: params.userId }],
  });

  if (!friend)
    return NextResponse.json({ message: "Friends not found" }, { status: 404 });

  return NextResponse.json(friend, { status: 200 });
};
