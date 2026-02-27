import Nav from "@/components/general/Nav";
import PostSearch from "@/components/forms/PostSearch";
import UserInfo from "@/components/profile/posts/UserInfo";
import PostReviewCard from "@/components/rest/PostReviewCard";
import React from "react";

function Posts() {
  const postReviewCardList = [];
  for (let i = 0; i < 11; ++i) {
    postReviewCardList.push(<PostReviewCard rating={i / 2} />);
  }

  return (
    <div className="h-screen flex flex-col">
      {/* User's search parameters */}
      <PostSearch />

      {/* Scrollable Section (User's Info and Posts Display) */}
      <div className="flex-1 overflow-y-auto">
        <UserInfo />

        <div className="flex xl:flex-wrap gap-5 pb-3 px-10 bg-[#f2f2f2]">
          {...postReviewCardList}
        </div>
      </div>

      {/* Navbar */}
      <Nav />
    </div>
  );
}

export default Posts;
