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

function UserInfo({ userInfo }: UserInfoProps) {
  const personPostInfo = userInfo ?? FallBackUserInfo;
  return (
    <div className="flex items-center justify-center gap-6 border-b border-neutral-200 py-6">
      {/* Profile Picture */}
      <div className="flex items-center justify-center">
        <div className="relative h-24 w-24 flex-none">
          <Image
            src={"/profile.png"}
            alt={personPostInfo.name}
            fill
            priority
            className="rounded-full object-cover"
          />
        </div>
        {/* User Info */}
        <div className="pl-5 flex-1 min-w-0">
          <p className="text-2xl font-medium">{personPostInfo.name}</p>
          <p className="text-gray-500 mt-3 text-sm/4! line-clamp-2">
            {personPostInfo.bio}
          </p>

          <div className="mt-4 flex items-center">
            <div className="flex gap-16">
              <p>Reviews: {personPostInfo.reviews}</p>
              <p>Restaurant Visits: {personPostInfo.resturant_visits}</p>
              <p>Collections: {personPostInfo.collections}</p>
            </div>
          </div>
        </div>
        <button className="mt-auto ml-50 rounded-md bg-blue-300 hover:bg-blue-700 px-4 py-2 text-white">
          Add Friend
        </button>
      </div>
    </div>
  );
}

export default UserInfo;
