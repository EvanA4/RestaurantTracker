"use client";

import React from "react";
import Modal from "../general/Modal";
import Image from "next/image";
import SRMWrap from "./SRMWrap";

function SelectRestModal(props: {
  visible: boolean;
  setVisibile: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Modal visible={props.visible} setVisibile={props.setVisibile} centered>
      <div className="bg-neutral-800 w-[30vw] h-[30vw] rounded-3xl relative overflow-hidden">
        {/* Background map component */}
        <div className="h-full">
          <SRMWrap />
        </div>

        {/* Corner button */}
        <button
          className="absolute top-[5%] right-[5%] cursor-pointer opacity-70 hover:opacity-100 z-[400]"
          onClick={() => props.setVisibile(false)}
        >
          <div className="w-[35px] h-[35px] bg-neutral-700 rounded-full flex items-center justify-center">
            <Image
              src="/svgs/plus.svg"
              width={25}
              height={25}
              alt="close"
              className="rotate-45"
            />
          </div>
        </button>
      </div>
    </Modal>
  );
}

export default SelectRestModal;
