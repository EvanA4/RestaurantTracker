"use client";

import { Restaurant, RESTAURANT_TYPES } from "@/types/restaurant";
import React, { useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import RestSubcomponent from "../../rest/RestSubcomponent";
import RestMarker from "./RestMarker";
import { sleep } from "@/utils/sleep";
import Image from "next/image";
import MultiSelectDD from "@/components/general/MultiSelectDD";
import SingleSelectDD from "@/components/general/SingleSelectDD";

function SRMMap() {
  const [rests, setRests] = useState<Restaurant[]>([]);
  const options = ["Option 1", "Option 2", "Option 3", "Option 4"];
  const [selRestricts, setSelRestricts] = useState<boolean[]>(
    Array(options.length).fill(false),
  );
  const [selCuisine, setSelCuisine] = useState<number>(0);
  const [searchStr, setSearchStr] = useState<string>("");
  const isMarkerOpen = useRef(false);

  async function handleSearch() {
    console.log("Searching!");
  }

  async function handleClick(lat: number, lng: number) {
    if (!isMarkerOpen.current) {
      const rawRes = await fetch("/api/search", {
        method: "POST",
        body: JSON.stringify({
          lat,
          lng,
        }),
      });
      const res: Restaurant[] = await rawRes.json();
      // console.log(res);
      setRests(res);
    }
  }

  async function handlePopupOpen() {
    isMarkerOpen.current = true;
  }
  async function handlePopupClose() {
    // time before user can click for restaurants after closing marker
    await sleep(500);
    isMarkerOpen.current = false;
  }

  return (
    <div className="h-full">
      <div className="py-4 px-4 bg-neutral-200 flex justify-between">
        <div className="flex w-[60%] rounded-lg overflow-hidden shadow-md h-fit">
          <input
            type="text"
            className="bg-white shadow-md outline-none px-3 py-2 w-full"
            placeholder="Enter restaurant..."
            onChange={(e) => setSearchStr(e.target.value)}
          />
          <button
            className="bg-neutral-100 hover:bg-neutral-200 px-3 py-2 cursor-pointer text-white"
            onClick={handleSearch}
          >
            <Image src="/svgs/search.svg" width={20} height={20} alt="search" />
          </button>
        </div>
        <div className="w-[35%] flex flex-col gap-3">
          <SingleSelectDD
            options={["All cuisines", ...RESTAURANT_TYPES]}
            selected={selCuisine}
            setSelected={setSelCuisine}
          />
          <MultiSelectDD
            options={options}
            selected={selRestricts}
            setSelected={setSelRestricts}
            formatStr="%d restriction(s)"
          />
        </div>
      </div>
      <MapContainer
        center={[35.155856, -90.051944]}
        zoom={16}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer
          // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {rests.map((rest, idx) => (
          <Marker position={[rest.lat, rest.lng]} key={idx}>
            <Popup>
              <RestMarker rest={rest} />
            </Popup>
          </Marker>
        ))}
        <RestSubcomponent
          onClick={handleClick}
          onPopupOpen={handlePopupOpen}
          onPopupClose={handlePopupClose}
        />
      </MapContainer>
    </div>
  );
}

export default SRMMap;

/*
import { useMap } from "react-leaflet";
import { useEffect } from "react";

function GetCenter() {
  const map = useMap();

  useEffect(() => {
    const center = map.getCenter();
    console.log("Latitude:", center.lat);
    console.log("Longitude:", center.lng);
  }, [map]);

  return null;
}

subcomponent
*/
