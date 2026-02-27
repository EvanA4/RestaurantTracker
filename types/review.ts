import { TagDocument } from "@/models/Tag";
import { IImage } from "./imagedb/image";
import { Document } from "mongoose";

export type Review = {
  userId: string;
  restaurantId: string;
  rating: number;
  description: string;
  title: string;
};

export type PopulatedReview = {
  userId: string;
  restaurantId: string;
  rating: number;
  description: string;
  title: string;
  images: IImage[];
  tags: TagDocument[];
} & Document;
