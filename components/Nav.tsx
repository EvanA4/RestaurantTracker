import Link from "next/link";
import React from "react";

function Nav() {
  return (
    <div className="h-0">
      <div className="h-[50px] bg-neutral-700 flex px-10">
        <Link
          href={"/"}
          className="hover:bg-neutral-600 flex items-center px-3"
        >
          Home
        </Link>
        <Link
          href={"/user-auth"}
          className="hover:bg-neutral-600 flex items-center px-3"
        >
          User Auth
        </Link>
        <Link
          href={"/maps-api"}
          className="hover:bg-neutral-600 flex items-center px-3"
        >
          Maps API
        </Link>
        <Link
          href={"/mongodb"}
          className="hover:bg-neutral-600 flex items-center px-3"
        >
          MongoDB
        </Link>
      </div>
    </div>
  );
}

export default Nav;
