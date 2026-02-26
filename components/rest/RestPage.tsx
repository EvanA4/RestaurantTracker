"use client";
import React, { useEffect, useState } from "react";
import StickyRestSelect from "../forms/StickyRestSelect";
import Image from "next/image";
import ReviewCard from "./ReviewCard";
import Rating from "./Rating";
import ReviewModal from "../modals/Review/ReviewModal";
import { useUser } from "@auth0/nextjs-auth0";
import { useRouter, useSearchParams } from "next/navigation";
import { Restaurant } from "@/types/restaurant";
import { PopulatedReview } from "@/types/review";

function RestPage() {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const { user, isLoading } = useUser();
  const [review, setReview] = useState<PopulatedReview>();
  const [rest, setRest] = useState<Restaurant>({
    name: "Loading...",
    mapboxId: "",
    phone: "...",
    website: "...",
    lat: -1,
    lng: -1,
  });
  const searchParams = useSearchParams();
  const router = useRouter();

  async function fetchRest() {
    const rawRes = await fetch(`/api/poi/${searchParams.get("id")}`);
    const res = await rawRes.json();

    if (!res.restaurant) {
      router.back();
    }

    setRest(res.restaurant);
  }

  async function checkForReview() {
    let rawRes = await fetch(
      `/api/review/${user!.sub}?restaurantId=${searchParams.get("id")}`,
    );
    let res = await rawRes.json();
    let review: PopulatedReview;
    if (res.reviews && res.reviews.length > 0) {
      review = res.reviews[0];
    } else {
      return;
    }

    rawRes = await fetch(`/api/images?reviewId=${review._id}`);
    res = await rawRes.json();
    review.images = res.images;

    rawRes = await fetch(`/api/tags/${review._id}`);
    res = await rawRes.json();
    review.tags = res.tags;

    setReview(review);
  }

  const reviews = [];
  for (let i = 0; i < 11; ++i) {
    reviews.push(<ReviewCard rating={i / 2} />);
  }

  useEffect(() => {
    if (searchParams && router && !isLoading) {
      if (!searchParams.get("id")) {
        router.back();
      }
      fetchRest();
      if (user) {
        checkForReview();
      }
    }
  }, [searchParams, router, user, isLoading]);

  return (
    <div className="min-h-full flex flex-col gap-5 md:gap-10">
      {/* User's search parameters */}
      <div className="bg-[#f2f2f2] px-10 pt-[60px] border-b-2 border-b-neutral-200 pb-5 flex justify-between items-end">
        <div>
          <p className="pt-5 text-2xl">{rest.name}</p>
          <div className="flex items-center gap-3 mt-3">
            <Rating value={2.5} />
            <p className="text-[11px] 2xl:text-[13px]">135 Reviews</p>
          </div>
        </div>
        {user && (
          <button
            className="px-3 py-2 bg-blue-200 hover:bg-blue-300 rounded-lg"
            onClick={() => setShowReviewModal((prev) => !prev)}
          >
            {review ? "Edit Review" : "Review"}
          </button>
        )}
      </div>

      {/* Restaurants display */}
      <div className="xl:grid grid-cols-3 2xl:grid-cols-7 pb-15">
        <div className="col-span-2 2xl:col-span-5">
          <div className="pl-15 w-fit">
            <p>Cuisine: Fix Me</p>
            {rest.phone && (
              <div className="flex gap-5 items-center mt-3 opacity-60">
                <Image
                  src="/svgs/phone.svg"
                  width={20}
                  height={20}
                  alt="phone"
                />
                <span className="w-fit">{rest.phone}</span>
              </div>
            )}
            {rest.website && (
              <a href={rest.website}>
                <div className="flex gap-5 items-center mt-3 opacity-60">
                  <Image
                    src="/svgs/globe.svg"
                    width={20}
                    height={20}
                    alt="web"
                  />
                  <span className="text-black hover:underline w-fit">
                    {rest.website == "..."
                      ? "..."
                      : new URL(rest.website).hostname}
                  </span>
                </div>
              </a>
            )}
          </div>
          <p className="mt-10 pl-15 mb-3 md:mb-5 text-2xl md:text-3xl">
            Reviews
          </p>
          <div className="flex xl:flex-wrap gap-5 overflow-x-scroll scrollbar-none pb-3 px-10">
            {...reviews}
          </div>
        </div>

        <div className="hidden xl:block w-full h-full 2xl:col-span-2 relative">
          <StickyRestSelect />
        </div>
      </div>

      <ReviewModal
        visible={showReviewModal}
        setVisibile={setShowReviewModal}
        review={review}
        setReview={setReview}
      />
    </div>
  );
}

export default RestPage;
