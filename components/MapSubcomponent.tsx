"use client";

import { LatLng } from "leaflet";
import React, { useState } from "react";
import { useMapEvents } from "react-leaflet";

function MapSubcomponent() {
  const [position, setPosition] = useState<LatLng | null>(null);

  const map = useMapEvents({
    click(e) {
      console.log("Click detected!", e.latlng);
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      console.log("Found position:", e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
    locationerror(e) {
      console.log("Failed to get position:", e.message);
    },
  });

  return <></>;
}

export default MapSubcomponent;
