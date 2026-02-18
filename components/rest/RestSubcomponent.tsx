"use client";

import React from "react";
import { useMapEvents } from "react-leaflet";

function RestSubcomponent(props: {
  onClick: (lat: number, lng: number) => void;
  onPopupOpen: () => Promise<void>;
  onPopupClose: () => Promise<void>;
}) {
  useMapEvents({
    click(e) {
      props.onClick(e.latlng.lat, e.latlng.lng);
    },
    popupopen(e) {
      props.onPopupOpen();
    },
    popupclose(e) {
      props.onPopupClose();
    },
  });

  return <></>;
}

export default RestSubcomponent;
