"use client";

import React from "react";
import Modal from "../general/Modal";

function SelectRestModal(props: {
  visible: boolean;
  setVisibile: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Modal visible={props.visible} setVisibile={props.setVisibile} centered>
      <div className="bg-neutral-800 w-[50vw] h-[50vw] py-10 rounded-3xl relative">
        Epic restaurant selection modal
        <button
          className="px-3 py-2 absolute top-5 right-5 cursor-pointer text-neutral-400 hover:text-white"
          onClick={() => props.setVisibile(false)}
        >
          Close
        </button>
      </div>
    </Modal>
  );
}

export default SelectRestModal;
