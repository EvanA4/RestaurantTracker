"use client";
import React, { useEffect, useRef, useState } from "react";
import Modal from "./Modal";

// Multi-select drop-down input
function SingleSelectDD(props: {
  options: string[];
  selected: number;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { options, selected, setSelected } = props;
  const [showOptions, setShowOptions] = useState<boolean>(false);

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
        {options[selected]}
      </button>
      <div
        className={
          `absolute w-full bottom-0 right-0 translate-y-[100%] rounded-b-2xl shadow-2xl transition-all duration-200 overflow-hidden z-[403] ` +
          (showOptions ? "h-auto" : "h-0")
        }
      >
        <div ref={divRef} className="max-h-[30vh] overflow-scroll">
          {options.map((val, idx) => (
            <button
              key={idx}
              className="bg-white hover:bg-neutral-100 w-full text-center py-2"
              onClick={() => setSelected(() => idx)}
            >
              {val}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SingleSelectDD;
