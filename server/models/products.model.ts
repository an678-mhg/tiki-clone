import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const products = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    images: {
      type: [String],
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "categories",
      required: true,
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: "brands",
      required: true,
    },
    prices: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    attributes: [
      {
        name: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
      },
    ],
    status: {
      type: Boolean,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    review: {
      type: Number,
      default: 0,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

products.plugin(mongoosePaginate);

interface productDocument extends mongoose.Document {}

export default mongoose.model<
  productDocument,
  mongoose.PaginateModel<productDocument>
>("products", products);
