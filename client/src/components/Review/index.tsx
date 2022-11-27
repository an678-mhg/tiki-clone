import React from "react";
import ImageReview from "./Filter/ImageReview";
import Overview from "./Filter/Overview";
import ReviewItem from "./ReviewItem";

const Review = () => {
  return (
    <div className="mt-5 bg-white">
      <div className="border-b border-gray-200 p-4">
        <h1 className="text-[20px] font-normal">Đánh Giá - Nhận Xét</h1>

        <div className="md:px-12 flex mt-4">
          <Overview />
          <ImageReview />
        </div>
      </div>

      <div>
        <ReviewItem />
        <ReviewItem />
      </div>
    </div>
  );
};

export default Review;
