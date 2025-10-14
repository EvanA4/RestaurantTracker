import MapDemo from "@/components/MapDemo";
import Nav from "@/components/Nav";
import React from "react";

function MapsPage() {
  return (
    <div className="h-full">
      <Nav />
      <div className="h-full flex flex-col items-center justify-center">
        <MapDemo />
      </div>
    </div>
  );
}

export default MapsPage;
