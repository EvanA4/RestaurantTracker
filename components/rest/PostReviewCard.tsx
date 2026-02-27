import Rating from "./Rating";
import Image from "next/image";
import { UserPostInfo } from "@/types/UserPostInfo";
import React from "react";

type UserInfoProps = {
  userInfo?: UserPostInfo;
};

/* Temporary component to display user info on the posts page.
 * Will be replaced when backend is implemented.
 */
const FallBackUserInfo: UserPostInfo = {
  user_id: "1",
  name: "SweetTooth27",
  bio: "Bio",
  review_comments: "A must try spot!",
  reviews: 42,
  resturant_visits: 12,
  collections: 5,
};

function PostReviewCard(props: { rating: number; userInfo?: UserPostInfo }) {
  const personPostInfo = props.userInfo ?? FallBackUserInfo;
  return (
    <div className="mt-13 min-w-62.5 w-[22%] rounded-xl overflow-hidden shadow-lg">
      <Image
        src="/mcdonalds.jpg"
        width={0}
        height={0}
        alt="restaurant pic"
        unoptimized
        priority
        style={{ width: "100%", height: "40%", objectFit: "cover" }}
      />
      <div className="w-full h-62.5 bg-white bottom-0 left-0 text-neutral-600 p-5 flex flex-col gap-3">
        <b className="text-black">{personPostInfo.review_comments}</b>
        <div className="flex items-center gap-3">
          <Rating value={props.rating} />
        </div>
        <p className="text-[14px] text-blue-400">{personPostInfo.name}</p>
        <p className="text-[10px] 2xl:text-[12px] 3xl:text-[14px]">
          The Pizza was delicious! There was a lot of variety in menu items. The
          service was quick!
        </p>
      </div>
    </div>
  );
}

export default PostReviewCard;
