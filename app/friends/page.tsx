"use client";

import Nav from "@/components/general/Nav";
import React from "react";
import FriendCard from "@/components/profile/friends/FriendCard";

function Profile() {
  const friends = [];
  for (let i = 0; i < 11; ++i) {
    friends.push(<FriendCard />);
  }
  return (
    <div className="h-full relative">
      <div>
        <p className="pt-[75px] pl-[10px] text-2xl border-b-1 border-b-gray-300">
          Friends
        </p>
      </div>
      <div className="pt-[3%] flex flex-col md:flex-row items-center justify-around">
        <div className="w-full flex flex-col overflow-hidden p-6 lg:p-10">
          <div className="border-1 border-b-0 border-gray-300">
            <p className="p-1 text-lg">Friends</p>
          </div>
          <div className="overflow-y-scroll !h-100 scrollbar-none divide-solid divide-y divide-gray-300 border-1 border-gray-300">
            {...friends}
          </div>
        </div>

        <div className="w-full flex flex-col overflow-hidden p-6 lg:p-10">
          <div className="border-1 border-b-0 border-gray-300">
            <p className="p-1 text-lg">Invites</p>
          </div>
          <div className="overflow-y-scroll !h-100 scrollbar-none divide-solid divide-y divide-gray-300 border-1 border-gray-300">
            <p className="p-1 text-sm">Sent Invites</p>
            {...friends}
            <p className="p-1 text-sm">Pending Invites</p>
            {...friends}
          </div>
        </div>
      </div>
      {/* Bottom Navbar */}
      <Nav />
    </div>
  );
}

export default Profile;
