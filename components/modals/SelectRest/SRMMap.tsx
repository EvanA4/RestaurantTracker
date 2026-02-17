"use client";

import { Restaurant } from "@/types/restaurant";
import Image from "next/image";
import React, { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import RestSubcomponent from "../../rest/RestSubcomponent";

function SRMMap() {
  const [rests, setRests] = useState<Restaurant[]>([]);

  async function handleClick(lat: number, lng: number) {
    const rawRes = await fetch("/api/search", {
      method: "POST",
      body: JSON.stringify({
        lat,
        lng,
      }),
    });
    const res: Restaurant[] = await rawRes.json();
    console.log(res);
    setRests(res);
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
            <div className="w-[200px]">
              {rest.website ? (
                <a href={rest.website}>
                  <span className="text-xl m-0 p-0 block">{rest.name}</span>
                </a>
              ) : (
                <span className="text-xl m-0 p-0 block">{rest.name}</span>
              )}
              <span className="block text-neutral-500">
                {rest.lat.toFixed(3)}, {rest.lng.toFixed(3)}
              </span>
              {rest.phone && (
                <div className="flex gap-5 items-center mt-3">
                  <Image
                    src="/svgs/phone.svg"
                    width={20}
                    height={20}
                    alt="fish meme"
                  />
                  <span className="w-fit">{rest.phone}</span>
                </div>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
      <RestSubcomponent onClick={handleClick} />
    </MapContainer>
  );
}

export default SRMMap;
