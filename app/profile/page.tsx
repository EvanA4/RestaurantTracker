"use client";

import Nav from "@/components/general/Nav";
import AccountSubpage from "@/components/profile/account/AccountSubpage";
import CollectionSubpage from "@/components/profile/collections/CollectionsSubpage";
import FriendsSubpage from "@/components/profile/friends/FriendsSubpage";
import PostsSubpage from "@/components/profile/posts/PostsSubpage";
import ProfileTabsNav from "@/components/profile/ProfileTabsNav";
import React, { useState } from "react";

function Profile() {
  const [subpage, setSubpage] = useState("account");

  const subpageNames = ["account", "collections", "friends", "posts"];
  const subpageComps = [
    <AccountSubpage key={0} />,
    <CollectionSubpage key={1} />,
    <FriendsSubpage key={2} />,
    <PostsSubpage key={3} />,
  ];

  return (
    <div className="h-full relative">
      {/* Top Profile Tabs Navbar */}
      <ProfileTabsNav subpage={subpage} setSubpage={setSubpage} />

      <div className="h-full flex items-center justify-center">
        {subpageComps[subpageNames.indexOf(subpage)]}
      </div>

      {/* Bottom Navbar */}
      <Nav />
    </div>
  );
}

export default Profile;
