import mongoose, { Schema } from "mongoose";

const carts = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "products",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("carts", carts);
