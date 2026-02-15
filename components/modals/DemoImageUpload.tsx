"use client";

import React from "react";
import Modal from "../general/Modal";
import FileUploader from "../forms/FileUploader";

function DemoImageUpload(props: {
  visible: boolean;
  setVisibile: React.Dispatch<React.SetStateAction<boolean>>;
  refreshImages: () => Promise<void>;
}) {
  async function handleUpload(files: File[]) {
    const formData = new FormData();
    for (const name in files) {
      formData.append("images", files[name]);
    }

    const rawRes = await fetch("/api/images", {
      method: "POST",
      body: formData,
    });

    props.refreshImages();
  }

  return (
    <Modal visible={props.visible} setVisibile={props.setVisibile} centered>
      <div className="bg-neutral-100 w-[50vw] h-[50vh] rounded-3xl relative overflow-hidden shadow-2xl py-5 px-10 flex flex-col justify-around">
        <div className="flex w-full justify-end">
          <button
            className="px-3 py-2 bg-red-200 hover:bg-red-300 rounded-lg"
            onClick={() => props.setVisibile(false)}
          >
            Close
          </button>
        </div>

        <div className="h-[80%]">
          <FileUploader
            onUpload={handleUpload}
            allowedTypes={["png", "jpg", "jpeg", "JPG", "JPEG"]}
            multipleFiles
          />
        </div>
      </div>
    </Modal>
  );
}

export default DemoImageUpload;
