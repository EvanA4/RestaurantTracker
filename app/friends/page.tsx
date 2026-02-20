"use client";

import Nav from "@/components/general/Nav";
import React from "react";
import FriendCard from "@/components/profile/friends/FriendCard";
import { MAPIUser } from "@/types/auth0/mapi_user";
import SentInviteCard from "@/components/profile/friends/SentInviteCard";
import PendingInviteCard from "@/components/profile/friends/PendingInviteCard";

function Profile() {
  const friends = [];
  const sent = [];
  const pending = [];
  const placeholderFriend: MAPIUser = {
    picture: "/favicon.ico",
    name: "Bob",
    user_id: "",
    nickname: "",
    given_name: "",
    family_name: "",
    email: "",
    email_verified: false,
    idp_tenant_domain: "",
    identities: [
      {
        access_token: "",
        expires_in: 0,
        connection: "",
        user_id: "",
        provider: "",
        isSocial: false,
      },
    ],
    last_login: "",
    last_ip: "",
    logins_count: 0,
    created_at: "",
    updated_at: "",
  };
  for (let i = 0; i < 11; ++i) {
    friends.push(<FriendCard friend={placeholderFriend} />);
    sent.push(<SentInviteCard friend={placeholderFriend} />);
    pending.push(<PendingInviteCard friend={placeholderFriend} />);
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
            <p className="p-2 text-lg">Friends</p>
          </div>
          <div className="overflow-y-scroll !h-115 scrollbar-none divide-solid divide-y divide-gray-300 border-1 border-gray-300">
            {...friends}
          </div>
        </div>

        <div className="w-full flex flex-col overflow-hidden p-6 lg:p-10">
          <div className="border-1 border-b-0 border-gray-300">
            <p className="p-2 text-lg">Invites</p>
          </div>
          <div className="overflow-y-scroll !h-115 scrollbar-none divide-solid divide-y divide-gray-300 border-1 border-gray-300">
            <p className="p-2 text-md">Sent Invites</p>
            {...sent}
            <p className="p-2 text-md">Pending Invites</p>
            {...pending}
          </div>
        </div>
      </div>
      {/* Bottom Navbar */}
      <Nav />
    </div>
  );
}

export default Profile;
