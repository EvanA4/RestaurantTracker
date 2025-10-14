import React from "react";
import { useMapEvents } from "react-leaflet";

function MapSubcomponent() {
  const map = useMapEvents({
    click() {
      console.log("There was a click!");
    },
  });

  return <></>;
}

export default MapSubcomponent;
