"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

function RestDemo() {
  const RestWrapper = useMemo(
    () =>
      dynamic(() => import("@/components/rest/RestWrapper"), {
        loading: () => (
          <div className="w-[50%] h-[50%] bg-neutral-700 flex items-center justify-center">
            <p className="text-2xl">
              <b>Loading...</b>
            </p>
          </div>
        ),
        ssr: false,
      }),
    [],
  );

  return <RestWrapper />;
}

export default RestDemo;
