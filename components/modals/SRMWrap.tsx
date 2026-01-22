"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

function SRMWrap() {
  const SRMMap = useMemo(
    () =>
      dynamic(() => import("@/components/modals/SRMMap"), {
        loading: () => (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-2xl">
              <b>Loading...</b>
            </p>
          </div>
        ),
        ssr: false,
      }),
    [],
  );

  return <SRMMap />;
}

export default SRMWrap;
