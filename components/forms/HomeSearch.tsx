"use client";

import React, { useState } from "react";
import SelectRestModal from "../modals/SelectRestModal";

function HomeSearch() {
  const [searchStr, setSearchStr] = useState("");
  const [showSelectRest, setShowSelectRest] = useState(false);

  async function handleSearch() {
    console.log(`Searched string: "${searchStr}"`);
  }

  return (
    <div className="bg-[#f2f2f2] px-10 pt-[60px] border-b-2 border-b-neutral-200">
      <p className="pt-5 text-2xl">Find the best restaurants and food spots.</p>
      <div className="flex gap-3 mt-2">
        <input
          type="text"
          className="bg-white shadow-md outline-none p-2 rounded-xl w-full"
          placeholder="Search post, restaurant, user..."
          onChange={(e) => setSearchStr(e.target.value)}
        />
        <button
          className="bg-blue-600 hover:bg-blue-500 px-3 py-2 rounded-xl cursor-pointer text-white"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <div className="flex gap-3 py-5">
        <button
          className="bg-red-700 hover:bg-red-600 px-3 py-2 rounded-xl cursor-pointer text-white"
          onClick={() => setShowSelectRest((prev) => !prev)}
        >
          Select Restaurant
        </button>
      </div>

      <SelectRestModal
        visible={showSelectRest}
        setVisibile={setShowSelectRest}
      />
    </div>
  );
}

export default HomeSearch;
