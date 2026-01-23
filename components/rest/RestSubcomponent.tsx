"use client";

import React from "react";
import { useMapEvents } from "react-leaflet";

function RestSubcomponent(props: {
  onClick: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(e) {
      props.onClick(e.latlng.lat, e.latlng.lng);
    },
  });

  return <></>;
}

export default RestSubcomponent;
