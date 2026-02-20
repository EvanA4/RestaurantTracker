import React from "react";
import Rating from "./Rating";
import Image from "next/image";

function RestCard(props: { rating: number }) {
  return (
    <div className="min-w-[250px] w-[22%] rounded-xl overflow-hidden shadow-lg">
      <Image
        src="/mcdonalds.jpg"
        width={0}
        height={0}
        alt="restaurant pic"
        unoptimized
        priority
        style={{ width: "100%", height: "40%", objectFit: "cover" }}
      />
      <div className="w-full h-[250px] bg-white bottom-0 left-0 text-neutral-600 p-5 flex flex-col gap-3">
        <b className="text-black">McDonald&apos;s</b>
        <div className="flex items-center gap-3">
          <Rating value={props.rating} />
          <p className="text-[11px] 2xl:text-[13px]">135 Reviews</p>
        </div>
        <p className="text-[14px]">Italian</p>
        <p className="text-[10px] 2xl:text-[12px] 3xl:text-[14px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </div>
  );
}

export default RestCard;
