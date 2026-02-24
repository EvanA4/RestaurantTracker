import { MapBoxResponse } from "@/types/mapbox/lookupResponse";
import { Restaurant } from "@/types/restaurant";

export async function getRestaurantById(
  id: string,
): Promise<Restaurant | undefined> {
  /*
    Look up restaurant by mapbox_id! Two steps:
    1. Use MapBox's limited mapbox_id lookup API (doesn't include website or phone)
    2. Use resulting coords in searchBox for complete restaurant obj
    */

  // Get basic restaurant data
  let rawRes = await fetch(
    `https://api.mapbox.com/search/searchbox/v1/retrieve/${id}?` +
      new URLSearchParams({
        access_token: process.env.MAPBOX_KEY!,
        session_token: "",
      }),
  );
  let res: MapBoxResponse = await rawRes.json();
  // console.log(res);

  if (!res.features) return;

  const limited: Restaurant = {
    mapboxId: res.features[0].properties.mapbox_id,
    name: res.features[0].properties.name,
    website: res.features[0].properties.metadata?.website,
    phone: res.features[0].properties.metadata?.phone,
    lng: res.features[0].geometry.coordinates[0],
    lat: res.features[0].geometry.coordinates[1],
  };
  // console.log(limited);

  // Use limited data to try to fetch more data
  rawRes = await fetch(
    `https://api.mapbox.com/search/searchbox/v1/category/restaurant?` +
      new URLSearchParams({
        access_token: process.env.MAPBOX_KEY!,
        limit: "1",
        proximity: `${limited.lng},${limited.lat}`,
      }),
  );
  res = await rawRes.json();
  // console.log(res);

  if (!res.features) return;

  const complete = {
    mapboxId: res.features[0].properties.mapbox_id,
    name: res.features[0].properties.name,
    website: res.features[0].properties.metadata?.website,
    phone: res.features[0].properties.metadata?.phone,
    lng: res.features[0].geometry.coordinates[0],
    lat: res.features[0].geometry.coordinates[1],
  };
  // console.log(complete);

  // The attempt to fetch more complete data may have failed
  // If id's differ, ALWAYS return the limited object's data
  return complete.mapboxId == limited.mapboxId ? complete : limited;
}
