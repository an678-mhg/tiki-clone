import mongoose, { Schema } from "mongoose";

const sliders = new Schema(
  {
    image: String,
  },
  { timestamps: true }
);

export default mongoose.model("sliders", sliders);
