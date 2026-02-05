"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const tabs = [
  { label: "Account", href: "/profile/account" },
  { label: "Friends", href: "/profile/friends" },
  { label: "Posts", href: "/profile/posts" },
  { label: "Collections", href: "/profile/collections" },
];

function ProfileTabsNav() {
  const pathname = usePathname();

  return (
    <div className="w-full fixed top-0 left-0 z-50">
      <div className="h-[50px] bg-neutral-700 flex justify-center px-10 gap-2">
        {tabs.map((tab) => {
          const isActive =
            pathname === tab.href || pathname.startsWith(tab.href + "/");
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex items-center px-3 rounded-md ${
                isActive ? "bg-neutral-600" : "hover:bg-neutral-600"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default ProfileTabsNav;
