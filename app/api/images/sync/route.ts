import { NextRequest, NextResponse } from "next/server";

export const POST = async function (req: NextRequest) {
  const body = await req.json();
  console.log(JSON.stringify(body));
  console.log(req.nextUrl.searchParams);
  return NextResponse.json({}, { status: 200 });
};

/*
POST
- Deletes any files/MongoDB documents not found in both the filesystem and MongoDB
- Body must contain `password` field
*/
