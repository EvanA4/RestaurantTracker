"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

function SRMWrap() {
  const SRMMap = useMemo(
    () =>
      dynamic(() => import("@/components/modals/SelectRest/SRMMap"), {
        loading: () => (
          <div className="w-full h-full flex items-center justify-center bg-neutral-200">
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
