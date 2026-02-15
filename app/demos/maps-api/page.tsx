import MapDemo from "@/components/map/MapDemo";
import React from "react";
import DemoNav from "@/components/general/DemoNav";

function MapsPage() {
  return (
    <div className="h-full">
      <DemoNav />
      <div className="h-full flex flex-col items-center justify-center">
        <MapDemo />
      </div>
    </div>
  );
}

export default MapsPage;
