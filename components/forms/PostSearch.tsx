"use client";

import React, { useState } from "react";
import SelectRestModal from "../modals/SelectRest/SelectRestModal";

function PostSearch() {
  const [searchStr, setSearchStr] = useState("");

  async function handleSearch() {
    console.log(`Searched string: "${searchStr}"`);
  }

  return (
    <div className="bg-[#f2f2f2] px-10 pt-[60px] border-b-2 border-b-neutral-200 pb-5">
      <p className="pt-5 text-2xl">Find posts or restaurants.</p>
      <div className="flex w-full rounded-xl overflow-hidden mt-2">
        <input
          type="text"
          className="bg-white shadow-md outline-none p-3 w-full "
          placeholder="Search posts or resturants..."
          onChange={(e) => setSearchStr(e.target.value)}
        />
        <button
          className="bg-blue-300 hover:bg-blue-700 px-3 py-2 cursor-pointer text-white"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default PostSearch;
