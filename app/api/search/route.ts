import { MapBoxResponse } from "@/types/mapbox/lookupResponse";
import { Restaurant } from "@/types/restaurant";
import { NextRequest, NextResponse } from "next/server";

export const POST = async function (req: NextRequest) {
  const body: {
    lat: number;
    lng: number;
  } = await req.json();
  console.log(body);

  const rawRes = await fetch(
    "https://api.mapbox.com/search/searchbox/v1/category/restaurant?" +
      new URLSearchParams({
        access_token: process.env.MAPBOX_KEY!,
        language: "en",
        limit: "10",
        proximity: `${body.lng},${body.lat}`,
      }),
  );
  const res: MapBoxResponse = await rawRes.json();
  const restaurants: Restaurant[] = res.features.map((val) => ({
    id: val.properties.mapbox_id,
    name: val.properties.name,
    website: val.properties.metadata?.website,
    phone: val.properties.metadata?.phone,
    lng: val.geometry.coordinates[0],
    lat: val.geometry.coordinates[1],
  }));
  console.log(restaurants);

  return NextResponse.json(restaurants, { status: 200 });
};
