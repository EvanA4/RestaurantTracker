"use client";
import DemoNav from "@/components/general/DemoNav";
import DemoImageUpload from "@/components/modals/DemoImageUpload";
import { IImage } from "@/types/imagedb/image";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function ImageDemo() {
  const [images, setImages] = useState<IImage[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  async function refreshImages() {
    const rawRes = await fetch("/api/images?var1=2&silly=wacky");
    const res = (await rawRes.json()).images as IImage[];
    setImages(res);
  }

  useEffect(() => {
    refreshImages();
  }, []);

  async function handleDelete(id: string) {
    const rawRes = await fetch(`/api/images?_id=${id}`, {
      method: "DELETE",
    });
    const res = await rawRes.json();
    console.log(res);

    refreshImages();
  }

  return (
    <div className="h-full">
      <DemoNav />
      <div className="h-full flex flex-col items-center justify-center">
        <div className="w-[30%]">
          <div className="flex justify-around items-center w-full">
            <p>Images API</p>
            <button
              className="bg-green-300 hover:bg-green-400 px-3 py-2 rounded-lg"
              onClick={() => setShowModal((prev) => !prev)}
            >
              Add
            </button>
          </div>

          <div className="flex flex-col gap-5 mt-5">
            {images?.map((val, idx) => (
              <div
                key={idx}
                className="bg-neutral-200 p-3 rounded-lg w-full flex justify-between"
              >
                <a href={`/api/images?_id=${val._id}`}>
                  <p>
                    {val.name}{" "}
                    <span className="text-neutral-500">
                      {val.width}x{val.height}
                    </span>
                  </p>
                </a>
                <div className="flex gap-5">
                  <p className="text-neutral-500">{val.size} B</p>
                  <button
                    className="opacity-50 hover:opacity-100"
                    onClick={() => handleDelete(val._id!)}
                  >
                    <Image
                      src="/svgs/btrash.svg"
                      alt="delete icon"
                      height={0}
                      width={0}
                      unoptimized
                      style={{ width: "auto", height: "25px" }}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <DemoImageUpload
        visible={showModal}
        setVisibile={setShowModal}
        refreshImages={refreshImages}
      />
    </div>
  );
}

export default ImageDemo;
