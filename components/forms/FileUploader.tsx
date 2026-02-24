"use client";

import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";

type FileUploaderProps = {
  onUpload: (files: File[]) => void;
  allowedTypes: string[];
  multipleFiles?: boolean;
};

type Upload = {
  name: string;
  size: number;
};

export default function FileUploader(props: FileUploaderProps) {
  const labelRef = useRef<HTMLLabelElement>(null);
  const dragCounter = useRef<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [uploaded, setUploaded] = useState<Upload[]>([]);

  function prettySize(size: number): string {
    if (size < 1000) {
      return `${size.toString()} B`;
    } else if (size < 1_000_000) {
      return `${(size / 1000).toFixed(2)} KB`;
    } else if (size < 1_000_000_000) {
      return `${(size / 1_000_000).toFixed(2)} MB`;
    } else {
      return `${(size / 1_000_000_000).toFixed(2)} GB`;
    }
  }

  function handleUpload(files: FileList) {
    const uploads: Upload[] = [];
    const validList: File[] = [];

    for (let i = 0; i < (props.multipleFiles ? files.length : 1); ++i) {
      const partitions = files[i].name.split(".");
      if (
        (partitions.length == 1 && props.allowedTypes.includes("")) ||
        (partitions.length > 1 &&
          props.allowedTypes.includes(partitions[partitions.length - 1]))
      ) {
        uploads.push({
          name: files[i].name,
          size: files[i].size,
        });

        validList.push(files[i]);
      }
    }

    setUploaded(uploads);
    if (validList.length > 0) {
      props.onUpload(validList);
    }
  }

  const handleDrop = useCallback((ev: DragEvent) => {
    ev.preventDefault();
    ev.stopPropagation();

    dragCounter.current = 0;
    setIsDragging(false);

    if (ev.dataTransfer && ev.dataTransfer.files) {
      handleUpload(ev.dataTransfer.files);
    }
  }, []);

  const handleDragOver = useCallback((ev: DragEvent) => {
    // console.log("dragover callback!");
    ev.preventDefault();
    ev.stopPropagation();
  }, []);

  const handleDragEnter = useCallback((ev: DragEvent) => {
    // console.log("dragenter callback!");
    dragCounter.current++;
    setIsDragging(dragCounter.current > 0);
    ev.preventDefault();
    ev.stopPropagation();
  }, []);

  const handleDragLeave = useCallback((ev: DragEvent) => {
    // console.log("dragexit callback!");
    dragCounter.current--;
    setIsDragging(dragCounter.current > 0);
    ev.preventDefault();
    ev.stopPropagation();
  }, []);

  useEffect(() => {
    const el = labelRef.current!;
    if (labelRef) {
      el.addEventListener("drop", handleDrop);
      el.addEventListener("dragover", handleDragOver);
      el.addEventListener("dragenter", handleDragEnter);
      el.addEventListener("dragleave", handleDragLeave);
    }

    return () => {
      el.removeEventListener("drop", handleDrop);
      el.removeEventListener("dragover", handleDragOver);
      el.removeEventListener("dragenter", handleDragEnter);
      el.removeEventListener("dragleave", handleDragLeave);
    };
  }, [labelRef]);

  return (
    <label
      ref={labelRef}
      className="w-full h-full block text-black"
      htmlFor="fileSelect"
    >
      <input
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.files) {
            handleUpload(e.target.files);
          }
        }}
        type="file"
        multiple
        className="hidden"
        id="fileSelect"
      />

      <div
        className={
          "w-full h-full rounded-lg flex flex-col items-center justify-center gap-5 border border-dashed p-10 " +
          (isDragging
            ? "bg-[#eaeaea] border-neutral-400"
            : "bg-neutral-100 hover:bg-[#eaeaea] border-neutral-600 hover:border-neutral-400")
        }
      >
        <Image
          height={80}
          width={80}
          alt="upload icon"
          src="/svgs/upload.svg"
          className={
            isDragging ? "opacity-100" : "opacity-70 hover:opacity-100"
          }
          draggable={false}
          priority
        />
        <div className="text-center">
          <p className="text-neutral-500 select-none">
            {isDragging ? "Drop to upload" : "Drag and drop files"}
          </p>
          <p className="text-neutral-800">
            Allowed types:{" "}
            {props.allowedTypes.length > 1
              ? props.allowedTypes.reduce((acc, fileType, idx) => {
                  return (
                    acc +
                    (idx == props.allowedTypes.length - 1
                      ? `and ${fileType.toUpperCase()}`
                      : `${fileType.toUpperCase()}, `)
                  );
                }, "")
              : props.allowedTypes[0].toUpperCase()}
          </p>
        </div>

        <div
          className="flex flex-col gap-5 overflow-y-scroll"
          style={{
            scrollbarWidth: "none",
          }}
        >
          {uploaded.map((upload, idx) => (
            <div
              key={idx}
              className="p-3 bg-neutral-300 flex justify-between gap-5 rounded-lg"
            >
              <p>
                <b>{upload.name}</b>
              </p>
              <p className="text-neutral-800">{prettySize(upload.size)}</p>
            </div>
          ))}
        </div>
      </div>
    </label>
  );
}
