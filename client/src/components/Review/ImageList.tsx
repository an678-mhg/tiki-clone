import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ImageList = () => {
  return (
    <div className="flex items-center">
      <div className="w-[120px] h-[120px] rounded-[4px] overflow-hidden">
        <LazyLoadImage
          height="100%"
          width="100%"
          effect="opacity"
          src="https://salt.tikicdn.com/cache/w200/ts/review/01/5d/6f/3a0f009c60242ba6041bea011eccdffd.jpg"
        />
      </div>
    </div>
  );
};

export default ImageList;
