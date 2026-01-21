import { IMovie, Movie } from "@/models/Movie";
import dbConnect from "@/utils/dbconnect";
import { NextResponse } from "next/server";

export const GET = async function () {
  await dbConnect();
  const movies = (await Movie.find().limit(3)) as IMovie[];
  return NextResponse.json(movies, { status: 200 });
};
