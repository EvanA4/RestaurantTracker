import { NextRequest, NextResponse } from "next/server";

export const GET = async function (req: NextRequest) {
  // Edge case: status 502, servers aren't running
  const rawRes = await fetch(
    `${process.env.IMAGEDB_HOST}/images${req.nextUrl.search}`,
  );
  const isImage = rawRes.headers.get("content-type")?.includes("image");

  if (isImage) {
    return rawRes;
  } else {
    return NextResponse.json(
      rawRes.status == 200
        ? await rawRes.json()
        : { message: "Error fetching images." },
      { status: 200 },
    );
  }
};

export const POST = async function (req: NextRequest) {
  const in_fd = await req.formData();
  in_fd.append("password", process.env.IMAGEDB_PASS!);
  const rawRes = await fetch(`${process.env.IMAGEDB_HOST}/images`, {
    method: "POST",
    body: in_fd,
  });
  // console.log(req.nextUrl.searchParams);
  return NextResponse.json(await rawRes.json(), { status: 200 });
};

export const DELETE = async function (req: NextRequest) {
  // Edge case: status 502, servers aren't running
  const rawRes = await fetch(
    `${process.env.IMAGEDB_HOST}/images${req.nextUrl.search}`,
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
  return NextResponse.json(
    rawRes.status == 200 ? res : { message: "Error deleting image." },
    { status: 200 },
  );
};
