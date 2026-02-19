"use client";
import React, { useEffect, useRef, useState } from "react";

// Multi-select drop-down input
function MultiSelectDD(props: {
  options: string[];
  formatStr: string;
  selected: boolean[];
  setSelected: React.Dispatch<React.SetStateAction<boolean[]>>;
}) {
  const { options, formatStr, selected, setSelected } = props;
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const numSelected = selected.filter((val) => val).length;

  const divRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  function handleClick(ev: MouseEvent) {
    if (
      ev.target &&
      divRef.current &&
      !divRef.current.contains(ev.target as Node) &&
      ev.target != btnRef.current
    ) {
      setShowOptions(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [divRef]);

  return (
    <div className="relative w-full">
      <button
        ref={btnRef}
        className={
          "bg-blue-200 hover:bg-blue-300 px-3 py-2 rounded-xl z-[402] relative w-full " +
          (showOptions && "rounded-b-none")
        }
        onClick={() => setShowOptions((prev) => !prev)}
      >
        {formatStr.replaceAll("%d", numSelected.toString())}
      </button>
      <div
        className={
          `absolute w-full bottom-0 right-0 translate-y-[100%] rounded-b-2xl shadow-2xl transition-all duration-200 overflow-hidden z-[401] ` +
          (showOptions ? "h-auto" : "h-0")
        }
      >
        <div ref={divRef} className="max-h-[30vh] overflow-scroll">
          {options.map((val1, idx1) => (
            <button
              key={idx1}
              className="flex gap-3 justify-center bg-white hover:bg-neutral-100 w-full text-center py-2"
              onClick={() =>
                setSelected((prev) =>
                  prev.map((val2, idx2) => {
                    if (idx1 == idx2) {
                      return !val2;
                    } else {
                      return val2;
                    }
                  }),
                )
              }
            >
              <input
                type="checkbox"
                name="check option"
                checked={selected[idx1]}
                onChange={(e) =>
                  setSelected((prev) =>
                    prev.map((val2, idx2) => {
                      if (idx1 == idx2) {
                        return e.target.checked;
                      } else {
                        return val2;
                      }
                    }),
                  )
                }
              />
              <p>{val1}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MultiSelectDD;
