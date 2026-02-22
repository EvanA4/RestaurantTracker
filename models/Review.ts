import { Review } from "@/types/review";
import { Model, Schema, model, models, Document } from "mongoose";

const reviewSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    restaurantId: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    photos: {
      type: [Schema.Types.ObjectId],
      ref: "Images",
      required: false,
    },
    tags: {
      type: [String],
      required: false,
    },
  },
  { timestamps: true },
);

export type ReviewDocument = Review & Document;
const ReviewModel =
  (models.Review as Model<ReviewDocument>) ||
  model<ReviewDocument>("Review", reviewSchema);
export default ReviewModel;
