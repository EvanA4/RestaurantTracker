import { MapBoxResponse } from "@/types/mapbox/lookupResponse";
import { Restaurant } from "@/types/restaurant";
import { NextRequest, NextResponse } from "next/server";

export const POST = async function (req: NextRequest) {
  const body: {
    searchStr: string;
    lat: number;
    lng: number;
    cuisine: string;
    restrictions: string[];
  } = await req.json();
  body.cuisine =
    body.cuisine == "All cuisines"
      ? "restaurant"
      : body.cuisine.toLowerCase().replaceAll(" ", "_") + "_restaurant";
  // console.log(body);

  let rawRes: Response;
  if (body.searchStr) {
    rawRes = await fetch(
      "https://api.mapbox.com/search/searchbox/v1/forward?" +
        new URLSearchParams({
          q: body.searchStr,
          limit: "10",
          proximity: `${body.lng},${body.lat}`,
          poi_category: body.cuisine,
          access_token: process.env.MAPBOX_KEY!,
        }),
    );
  } else {
    rawRes = await fetch(
      `https://api.mapbox.com/search/searchbox/v1/category/${body.cuisine}?` +
        new URLSearchParams({
          access_token: process.env.MAPBOX_KEY!,
          language: "en",
          limit: "10",
          proximity: `${body.lng},${body.lat}`,
        }),
    );
  }
  const res: MapBoxResponse = await rawRes.json();
  // console.log(res);

  if (res.features) {
    const restaurants: Restaurant[] = res.features.map((val) => ({
      id: val.properties.mapbox_id,
      name: val.properties.name,
      website: val.properties.metadata?.website,
      phone: val.properties.metadata?.phone,
      lng: val.geometry.coordinates[0],
      lat: val.geometry.coordinates[1],
    }));
    // console.log(restaurants);

    return NextResponse.json(restaurants, { status: 200 });
  }

  return NextResponse.json([], { status: 200 });
};
