"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

function MapDemo() {
  const MapWrapper = useMemo(
    () =>
      dynamic(() => import("@/components/map/MapWrapper"), {
        loading: () => (
          <div className="w-[50%] h-[50%] bg-neutral-200 flex items-center justify-center">
            <p className="text-2xl">
              <b>Loading...</b>
            </p>
          </div>
        ),
        ssr: false,
      }),
    [],
  );

  return <MapWrapper />;
}

export default MapDemo;
