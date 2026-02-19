"use client";
import React from "react";
import SRMWrap from "../modals/SelectRest/SRMWrap";

function StickyRestSelect() {
  return (
    <div className="sticky top-24 pr-10">
      <div className="h-[60vh] shadow-xl rounded-2xl overflow-hidden">
        <SRMWrap />
      </div>
    </div>
  );
}

export default StickyRestSelect;
