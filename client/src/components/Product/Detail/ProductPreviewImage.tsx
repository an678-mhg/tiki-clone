import React, { FC, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { FcNext, FcPrevious } from "react-icons/fc";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface ProductPreviewImageProps {
  images: string[];
  handleClose: () => void;
  from: number;
}

const ProductPreviewImage: FC<ProductPreviewImageProps> = ({
  images,
  handleClose,
  from,
}) => {
  const [index, setIndex] = useState(() => (from != -1 ? from : 0));

  return (
    <div className="fixed inset-0 bg-[#0D0D0D] flex items-center justify-center h-screen z-[9999] opacity-animation">
      <div
        onClick={handleClose}
        className="cursor-pointer absolute top-0 right-0 md:p-8 p-2 flex flex-col items-center justify-center md:mb-0 mb-4"
      >
        <MdOutlineClose color="#fff" className="text-4xl" />
        <p className="text-white font-normal text-sm">Đóng</p>
      </div>

      <div className="w-full">
        <div className="flex items-center justify-center relative w-[1000px] mx-auto max-w-[calc(100%-16px)]">
          <div className="w-[500px] max-w-full">
            <LazyLoadImage src={images[index]} effect="opacity" />

            <div
              onClick={() =>
                setIndex((prev) => (prev <= 0 ? images.length - 1 : prev - 1))
              }
              className="cursor-pointer absolute left-0 top-[50%] translate-y-[-50%] flex flex-col justify-center items-center"
            >
              <FcPrevious className="text-4xl" />
            </div>
            <div
              onClick={() =>
                setIndex((prev) => (prev >= images.length - 1 ? 0 : prev + 1))
              }
              className="cursor-pointer absolute right-0 top-[50%] translate-y-[-50%] flex flex-col justify-center items-center"
            >
              <FcNext className="text-4xl" />
            </div>
          </div>
        </div>

        <div className="w-[800px] max-w-[calc(100%-16px)] mx-auto mt-5">
          <h1 className="text-white text-lg font-normal border-b-[3px] border-blue-500 inline-block">
            Hình ảnh ({images.length})
          </h1>
          <div className="flex items-center overflow-x-auto mt-4">
            {images.map((image, imageIndex) => (
              <div
                onClick={() => setIndex(imageIndex)}
                className={`cursor-pointer flex p-0.5 rounded-sm items-center justify-center w-[80px] aspect-auto last:mr-0 border mr-1 ${
                  imageIndex === index
                    ? "border-blue-500"
                    : "border-transparent"
                }`}
                key={image}
              >
                <LazyLoadImage
                  className="select-none"
                  src={image}
                  effect="opacity"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPreviewImage;
