import Link from "next/link";
import React from "react";

function Nav() {
  return (
    <div className="w-full fixed bottom-0 left-0">
      <div className="h-[50px] bg-neutral-700 flex justify-center px-10">
        <Link
          href={"/"}
          className="hover:bg-neutral-600 flex items-center px-3"
        >
          Home
        </Link>
        <Link
          href={"/demos"}
          className="hover:bg-neutral-600 flex items-center px-3"
        >
          Demos
        </Link>
        <Link
          href={"/profile"}
          className="hover:bg-neutral-600 flex items-center px-3"
        >
          Profile
        </Link>
      </div>
    </div>
  );
}

export default Nav;
