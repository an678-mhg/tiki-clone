import mongoose, { Schema } from "mongoose";

const address = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    address: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    default: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("address", address);
