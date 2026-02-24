"use client";
import React, { useEffect, useState } from "react";
import Modal from "../../general/Modal";
import FileUploader from "../../forms/FileUploader";
import TagSelect from "./TagSelect";
import { useSearchParams } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0";
import { PopulatedReview } from "@/types/review";
import Image from "next/image";

function ReviewModal(props: {
  visible: boolean;
  setVisibile: React.Dispatch<React.SetStateAction<boolean>>;
  review?: PopulatedReview;
  setReview: React.Dispatch<React.SetStateAction<PopulatedReview | undefined>>;
}) {
  const { user } = useUser();
  const searchParams = useSearchParams();
  const [tags, setTags] = useState<string[]>([]);
  const [descInput, setDescInput] = useState<string>("");
  const [ratingInput, setRatingInput] = useState<number>(0);
  const [imagesInput, setImagesInput] = useState<File[]>([]);
  const [prevImagesInput, setPrevImagesInput] = useState<boolean[]>([]);

  useEffect(() => {
    if (props.review) {
      setTags(props.review.tags.map((val) => val.label as unknown as string));
      setDescInput(props.review.description);
      setRatingInput(props.review.rating);
      setPrevImagesInput(Array(props.review.images.length).fill(true));
    }
  }, [props.review]);

  async function handleSubmit() {
    const restaurantId = searchParams.get("id");
    if (user && restaurantId) {
      // perform submission here
      const formData = new FormData();
      for (const idx in imagesInput) {
        formData.append("images", imagesInput[idx]);
      }
      formData.append("description", descInput);
      formData.append("rating", ratingInput.toString());
      for (const idx in tags) {
        formData.append("tags", tags[idx]);
      }
      formData.append("restaurantId", restaurantId);

      if (!props.review) {
        const rawRes = await fetch(`/api/review/${user.sub}`, {
          method: "POST",
          body: formData,
        });
        const res = await rawRes.json();
        props.setReview(res.review);
      } else {
        const imagesToDelete = props.review.images.filter(
          (val, idx) => !prevImagesInput[idx],
        );
        imagesToDelete.forEach((val) =>
          formData.append("prevImagesToDelete", val._id!.toString()),
        );
        const rawRes = await fetch(
          `/api/review/${user.sub}/${props.review._id}`,
          {
            method: "PUT",
            body: formData,
          },
        );
        const res = await rawRes.json();
        setPrevImagesInput(Array(res.review.images.length).fill(true));
        setImagesInput([]);
        props.setReview(res.review);
      }

      props.setVisibile(false);
    }
  }

  async function handleDelete() {
    const rawRes = await fetch(
      `/api/review/${user!.sub}/${props.review!._id}`,
      {
        method: "DELETE",
      },
    );
    const res = await rawRes.json();
    console.log(res);

    setTags([]);
    setDescInput("");
    setRatingInput(0);
    setImagesInput([]);
    setPrevImagesInput([]);
    props.setReview(undefined);
    props.setVisibile(false);
  }

  return (
    <Modal visible={props.visible} setVisibile={props.setVisibile} centered>
      <div className="w-[95vw] md:w-[80vw] 3xl:w-[50vw] overflow-scroll bg-white shadow-xl rounded-xl border border-neutral-300 p-5 flex flex-col gap-5">
        <p className="text-xl text-center">Create Review</p>
        <textarea
          className="bg-white resize-none shadow-md p-3 w-full rounded-lg border border-neutral-300"
          placeholder="Description"
          onChange={(e) => setDescInput(e.target.value)}
          value={descInput}
        />
        <input
          type="number"
          className="bg-white shadow-md p-3 w-full rounded-lg border border-neutral-300"
          placeholder="Rating"
          onChange={(e) => setRatingInput(parseFloat(e.target.value))}
          value={ratingInput}
        />
        <TagSelect tags={tags} setTags={setTags} />

        <div className="min-h-[30vh]">
          {props.review && (
            <div className="flex gap-1 mb-1">
              {prevImagesInput.map((val, idx) => (
                <div
                  key={idx}
                  className={
                    "flex gap-3 px-3 py-1 bg-neutral-200 rounded-xl " +
                    (val ? "" : "line-through")
                  }
                >
                  {props.review!.images[idx]?.name}
                  <button
                    onClick={() =>
                      setPrevImagesInput((prev) => {
                        const output = [...prev];
                        output[idx] = !output[idx];
                        return output;
                      })
                    }
                  >
                    <Image
                      src="/svgs/btrash.svg"
                      width={16}
                      height={16}
                      alt="close"
                      className="opacity-50 hover:opacity-70 cursor-pointer"
                    />
                  </button>
                </div>
              ))}
            </div>
          )}
          <FileUploader
            onUpload={(files) => setImagesInput(files)}
            allowedTypes={["png", "jpg", "jpeg", "JPG", "JPEG"]}
            multipleFiles
          />
        </div>

        <div className="flex justify-end">
          <div className="flex gap-3">
            {props.review && (
              <button
                className="px-3 py-2 bg-red-200 hover:bg-red-300 rounded-lg"
                onClick={() => handleDelete()}
              >
                Delete
              </button>
            )}

            <button
              className="px-3 py-2 bg-blue-200 hover:bg-blue-300 rounded-lg"
              onClick={() => handleSubmit()}
            >
              {props.review ? "Update" : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ReviewModal;
