import Image from "next/image";
import Link from "next/link";
import React from "react";

function Nav() {
  return (
    <div className="w-full fixed top-0 left-0">
      <div className="h-[60px] bg-[#f2f2f2] flex justify-between border-b-2 border-b-neutral-200 z-10">
        <Image
          src="/logo.png"
          width={356}
          height={156}
          alt="Savorly logo"
          style={{ height: "100%", width: "auto", objectFit: "contain" }}
        />
        <div className="flex px-10">
          <Link
            href={"/"}
            className="hover:bg-neutral-200 transition-colors duration-200 pt-[2px] border-b-2 border-b-neutral-100 hover:border-b-blue-500 flex items-center px-3 z-20"
          >
            Home
          </Link>
          <Link
            href={"/demos"}
            className="hover:bg-neutral-200 transition-colors duration-200 pt-[2px] border-b-2 border-b-neutral-100 hover:border-b-blue-500 flex items-center px-3 z-20"
          >
            Demos
          </Link>
          <Link
            href={"/profile"}
            className="hover:bg-neutral-200 transition-colors duration-200 pt-[2px] border-b-2 border-b-neutral-100 hover:border-b-blue-500 flex items-center px-3 z-20"
          >
            Profile
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Nav;
