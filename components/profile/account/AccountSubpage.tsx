"use client";
import Nav from "@/components/general/Nav";
import React from "react";
import IconButton from "@mui/material/IconButton";
import { Avatar } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { useUser } from "@auth0/nextjs-auth0";
import Image from "next/image";

function AccountSubpage() {
  const { user, isLoading } = useUser();

  return (
    <div className="h-full flex flex-col items-center justify-center">
      {/* Profile picture */}
      {user ? (
        <Image
          src={user.picture ?? ""}
          alt={user.name ?? ""}
          width={96}
          height={96}
          priority
          className="rounded-full"
          style={{ width: "192px", height: "192px", objectFit: "contain" }}
        />
      ) : (
        <IconButton>
          <Avatar className="!w-48 !h-48 flex items-center justify-center">
            <PhotoCameraIcon className="!w-40 !h-40" />
          </Avatar>
        </IconButton>
      )}

      {/* Account information */}
      <div className="pt-8 gap-2 text-lg">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <p className="text-center">{user?.name}</p>
            <p className="text-center">{user?.email}</p>
          </>
        )}

        {/* I commented this out because I thought we might wanna reconvene
         about whether we want User data to be writable or read-only */}
        {/* <IconButton className="hover:!bg-gray-600"> 
          <EditIcon className="rounded-full text-white" />
        </IconButton> */}
      </div>

      {/* Login/Logout buttons */}
      {isLoading || (
        <>
          {" "}
          {user ? (
            <a
              href="/auth/logout"
              className="p-3 bg-red-600 hover:bg-red-500 text-white rounded-xl mt-5"
            >
              Logout
            </a>
          ) : (
            <a
              href="/auth/login"
              className="p-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl mt-5"
            >
              Login
            </a>
          )}{" "}
        </>
      )}

      <Nav />
    </div>
  );
}

export default AccountSubpage;
