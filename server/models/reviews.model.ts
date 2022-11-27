import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const reviews = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },
    ratings: {
      type: Number,
    },
    comment: {
      type: String,
      required: false,
    },
    likes: {
      type: [String],
    },
    images: {
      type: [String],
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: "reviews",
    },
  },
  {
    timestamps: true,
  }
);

reviews.plugin(mongoosePaginate);

interface reviewDocument extends mongoose.Document {}

export default mongoose.model<
  reviewDocument,
  mongoose.PaginateModel<reviewDocument>
>("reviews", reviews);
