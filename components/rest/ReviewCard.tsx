import Image from "next/image";
import React from "react";
import Rating from "./Rating";

function ReviewCard(props: { rating: number }) {
  return (
    <div className="min-w-[300px] h-[400px] rounded-xl overflow-hidden relative shadow-lg">
      <Image
        src="/mcdonalds.jpg"
        width={0}
        height={0}
        alt="restaurant pic"
        unoptimized
        priority
        style={{ width: "300px", height: "auto", objectFit: "contain" }}
      />
      <div className="w-full h-[250px] bg-white absolute bottom-0 left-0 rounded-xl text-black p-5">
        <div className="flex justify-between">
          <b>McDonald&apos;s</b>
          <Rating value={props.rating} />
        </div>
        <br />
        <b>Xx_Epic_Gamer_xX</b>
        <p className="text-neutral-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </div>
  );
}

export default ReviewCard;
