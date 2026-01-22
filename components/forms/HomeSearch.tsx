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
    <div>
      <div className="flex gap-3">
        <input
          type="text"
          className="bg-white outline-none text-black p-2 rounded-xl w-full"
          placeholder="Search post, restaurant, user..."
          onChange={(e) => setSearchStr(e.target.value)}
        />
        <button
          className="bg-blue-600 hover:bg-blue-500 px-3 py-2 rounded-xl cursor-pointer"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <div className="flex gap-3 py-5">
        <button
          className="bg-red-700 hover:bg-red-600 px-3 py-2 rounded-xl cursor-pointer"
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
