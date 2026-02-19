import FriendModel from "@/models/Friend";
import dbConnect from "@/utils/dbconnect";
import { NextRequest, NextResponse } from "next/server";

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
