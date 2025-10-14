"use client";

import { useUser } from "@auth0/nextjs-auth0";
import Image from "next/image";
import React from "react";

function UserDemo() {
  const { user, isLoading } = useUser();

  function getGreeting() {
    if (isLoading) {
      return "Loading...";
    } else if (!user) {
      return "Sign in!";
    } else {
      return `Hello, ${user?.name}!`;
    }
  }

  return (
    <>
      <div className="p-5 bg-neutral-800 rounded-3xl">
        {user && (
          <Image
            src={user.picture ?? ""}
            alt={user.name ?? ""}
            width={100}
            height={100}
            priority
            className="rounded-full m-5"
          />
        )}
        <p>{getGreeting()}</p>
      </div>

      <div className="flex gap-3 mt-5">
        <a
          href="/auth/login"
          className="p-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl"
        >
          Login
        </a>
        <a
          href="/auth/logout"
          className="p-3 bg-red-600 hover:bg-red-500 text-white rounded-xl"
        >
          Logout
        </a>
      </div>
    </>
  );
}

export default UserDemo;
