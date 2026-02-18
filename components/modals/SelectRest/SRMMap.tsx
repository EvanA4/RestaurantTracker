"use client";

import { Restaurant } from "@/types/restaurant";
import React, { useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import RestSubcomponent from "../../rest/RestSubcomponent";
import RestMarker from "./RestMarker";
import { sleep } from "@/utils/sleep";

function SRMMap() {
  const [rests, setRests] = useState<Restaurant[]>([]);
  const isMarkerOpen = useRef(false);

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
  );
}

export default SRMMap;
