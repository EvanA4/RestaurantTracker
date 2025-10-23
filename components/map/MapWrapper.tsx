"use client";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { LeafletMouseEvent } from "leaflet";
import Image from "next/image";
import MapSubcomponent from "./MapSubcomponent";

function MapWrapper() {
  function handleClick(event: LeafletMouseEvent) {
    console.log("Coords: ", event.latlng);
  }

  return (
    <MapContainer
      center={[35.155856, -90.051944]}
      zoom={16}
      scrollWheelZoom={true}
      className="w-[50%] h-[50%]"
    >
      <TileLayer
        // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={[35.155856, -90.051944]}
        eventHandlers={{
          click: handleClick,
        }}
      >
        <Popup>
          <div className="w-[200px]">
            <p>You can put anything in these markers! Check out this meme:</p>
            <a href="https://www.youtube.com/watch?v=GlE8qL3qLqk">
              <Image
                src="/pyramid.png"
                width={200}
                height={200}
                alt="fish meme"
              />
            </a>
          </div>
        </Popup>
      </Marker>
      <MapSubcomponent />
    </MapContainer>
  );
}

export default MapWrapper;
