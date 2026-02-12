// GET
// DELETE

import FriendModel from "@/models/Friend";
import dbConnect from "@/utils/dbconnect";
import { NextRequest, NextResponse } from "next/server";

export const deleteFriend = async function (
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  await dbConnect();

  // add some error checking here with other status codes

  const friend = await FriendModel.findOneAndDelete({ _id: params.id });
  return NextResponse.json(friend, { status: 200 });
};
