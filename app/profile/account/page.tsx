import Nav from "@/components/general/Nav";
import ProfileTabsNav from "@/components/profile/ProfileTabsNav";
import React from "react";

function AccountPage() {
  return (
    <div className="h-full relative">
      {/* Top Profile Tabs Navbar */}
      <ProfileTabsNav />

      {/* Content (pushed down so it does not hide behind the top navbar) */}
      <div className="pt-20 h-full flex items-center justify-center">
        <div className="p-10">Account (Stub) </div>
      </div>
      {/* Bottom Navbar */}
      <Nav />
    </div>
  );
}

export default AccountPage;
