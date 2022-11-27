import productsModel from "../models/products.model";
import reviewsModel from "../models/reviews.model";

const updateReview = (product: string) => {
  reviewsModel.find({ product }).exec(async (err, reviews) => {
    if (err) return;

    await productsModel.findOneAndUpdate(
      { _id: product },
      {
        reviewCount: reviews.length,
        review: (
          reviews.reduce((total, item: any) => total + item.ratings, 0) /
          reviews.length
        ).toFixed(1),
      }
    );
  });
};

export default updateReview;
