import { Friend } from "@/types/friend";
import { Model, Schema, model, models, Document } from "mongoose";

const FriendSchema = new Schema({
  requestorId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiverId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
});

export type FriendDocument = Friend & Document;
export default (models.Friend as Model<FriendDocument>) ||
  model<FriendDocument>("Friend", FriendSchema);
