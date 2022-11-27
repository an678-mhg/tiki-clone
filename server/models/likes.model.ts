import mongoose, { Schema } from "mongoose";

const likes = new Schema(
  {
    producId: {
      type: Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("likes", likes);
