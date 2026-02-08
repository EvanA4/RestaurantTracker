"use client";

import { Tab, Tabs } from "@mui/material";
import React from "react";

function ProfileTabsNav(props: {
  subpage: string;
  setSubpage: React.Dispatch<React.SetStateAction<string>>;
}) {
  const subpages = ["account", "collections", "friends", "posts"];
  return (
    <div className="w-full fixed bottom-[10] left-0 z-50">
      <div className="h-[50px] flex justify-center px-10 gap-2 text-white">
        <div className="bg-[#f2f2f2] rounded-xl overflow-hidden">
          <Tabs
            value={subpages.indexOf(props.subpage)}
            onChange={(_, val) => {
              props.setSubpage(subpages[val]);
              return val;
            }}
            aria-label="basic tabs example"
          >
            <Tab label="account" sx={{ color: "black" }} />
            <Tab label="collections" sx={{ color: "black" }} />
            <Tab label="friends" sx={{ color: "black" }} />
            <Tab label="posts" sx={{ color: "black" }} />
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default ProfileTabsNav;
