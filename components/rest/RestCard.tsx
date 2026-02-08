import React from "react";
import Rating from "./Rating";

function RestCard(props: { rating: number }) {
  return (
    <div className="min-w-[300px] h-[150px] rounded-xl overflow-hidden relative bg-white text-black p-5 shadow-lg">
      <div className="flex justify-between">
        <b>McDonald&apos;s</b>
        <Rating value={props.rating} />
      </div>
      <br />
      <p>Cuisine: American Fast Food</p>
    </div>
  );
}

export default RestCard;
