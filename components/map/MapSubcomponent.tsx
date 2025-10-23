"use client";

import React from "react";
import { useMapEvents } from "react-leaflet";

function MapSubcomponent() {
  const map = useMapEvents({
    click(e) {
      console.log("Click detected!", e.latlng);
      map.locate();
    },
    locationfound(e) {
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
