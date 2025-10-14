"use client";

import Nav from "@/components/Nav";
import { useUser } from "@auth0/nextjs-auth0";
import Image from "next/image";

export default function Home() {
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
    <div className="h-full">
      <Nav />
      <div className="flex flex-col items-center justify-center gap-5 h-full">
        <div>
          <p className="text-3xl text-center">Restaurant Tracker</p>
          <p className="text-neutral-400 text-center">
            This is just a proof of concept. Explore the demos in the nav bar!
          </p>
        </div>
      </div>
    </div>
  );
}
