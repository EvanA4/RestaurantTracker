"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  visible: boolean;
  setVisibile: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  hasShadow?: boolean;
  centered?: boolean;
};

export default function Modal(props: ModalProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [hasMounted, setMounted] = useState(false);

  function handleClick(ev: MouseEvent) {
    if (
      ev.target &&
      divRef.current &&
      !divRef.current.contains(ev.target as Node)
    ) {
      props.setVisibile(false);
    }
  }

  useEffect(() => {
    setMounted(true);

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [divRef]);

  if (!hasMounted) return <></>;

  return props.centered ? (
    createPortal(
      <>
        {props.visible && (
          <>
            <div
              className={
                "w-full h-screen flex justify-center items-center fixed top-0 left-0 z-50 " +
                (props.hasShadow && "bg-black/70")
              }
            >
              <div ref={divRef}>{props.children}</div>
            </div>
          </>
        )}
      </>,

      document.getElementById("modal-root")!,
    )
  ) : (
    <>
      {props.visible && (
        <>
          <div ref={divRef}>{props.children}</div>
        </>
      )}
    </>
  );
}
