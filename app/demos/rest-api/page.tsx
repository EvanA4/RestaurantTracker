import Nav from "@/components/general/DemoNav";
import RestDemo from "@/components/rest/RestDemo";
import React from "react";

function MapsPage() {
  return (
    <div className="h-full">
      <Nav />
      <div className="h-full flex flex-col items-center justify-center">
        <RestDemo />
      </div>
    </div>
  );
}

export default MapsPage;
