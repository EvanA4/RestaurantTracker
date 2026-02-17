"use client";

import Nav from "@/components/general/Nav";
import React from "react";

function Profile() {
  return (
    <div className="h-full relative">
      <div className="h-full flex items-center justify-center">
        <p>Profile page</p>
      </div>

      {/* Bottom Navbar */}
      <Nav />
    </div>
  );
}

export default Profile;
