import React from "react";
import ImageList from "../ImageList";
import FilterReview from "./FilterReview";

const ImageReview = () => {
  return (
    <div className="ml-[100px] md:block hidden">
      <h1 className="text-[17px] font-medium mb-4">Tất cả hình ảnh (14)</h1>
      <ImageList />
      <FilterReview />
    </div>
  );
};

export default ImageReview;
