import mongoose, { Schema } from "mongoose";

const orders = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    address: {
      type: Schema.Types.ObjectId,
      ref: "address",
      required: true,
    },
    paymentMethod: {
      type: Number,
      default: 1,
      enum: [1, 2],
    },
    total: {
      type: Number,
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
    status: {
      type: String,
      default: "Chờ xác nhận",
      enum: ["Chờ xác nhận", "Chờ lấy hàng", "Đang giao", "Đã giao", "Đã hủy"],
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("orders", orders);
