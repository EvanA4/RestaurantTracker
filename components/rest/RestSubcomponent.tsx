"use client";

import { Map } from "leaflet";
import React, { useEffect } from "react";
import { useMap, useMapEvents } from "react-leaflet";

function RestSubcomponent(props: {
  setMap: React.Dispatch<React.SetStateAction<Map | undefined>>;
  onClick: (lat: number, lng: number) => void;
  onPopupOpen: () => Promise<void>;
  onPopupClose: () => Promise<void>;
}) {
  const map = useMap();

  useEffect(() => {
    if (map) {
      props.setMap(map);
    }
  }, [map]);

  useMapEvents({
    click(e) {
      const center = map.getCenter();
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
