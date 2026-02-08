"use client";
import Nav from "@/components/general/Nav";
import React from "react";
import IconButton from "@mui/material/IconButton";
import { Avatar } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

function AccountSubpage() {
  const username = "Display Name";
  const change_picture = () => {};
  const change_username = () => {};
  return (
    <div className="h-full flex flex-col items-center justify-center">
      {/* Top Profile Tabs Navbar */}
      <IconButton onClick={change_picture}>
        <Avatar className="!w-48 !h-48 flex items-center justify-center">
          <PhotoCameraIcon className="!w-40 !h-40" />
        </Avatar>
      </IconButton>
      <div className="flex pt-8 gap-2">
        <span className="flex items-center justify-center text-lg">
          {username}
        </span>
        <IconButton className="hover:!bg-gray-600" onClick={change_username}>
          <EditIcon className="rounded-full text-white" />
        </IconButton>
      </div>
      <div className="pt-4">
        <button className="hover:!bg-gray-600 hover:!rounded-lg">
          <span className="text-md text-blue-400 cursor-pointer p-1">
            Log out
          </span>
        </button>
      </div>

      <Nav />
    </div>
  );
}

export default AccountSubpage;
