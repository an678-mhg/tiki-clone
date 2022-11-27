import React, { FC, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ProductPreviewImage from "./ProductPreviewImage";

interface ProductImageProps {
  images: string[];
}

const ProductImage: FC<ProductImageProps> = ({ images }) => {
  const [image, setImage] = useState<string | null>(null);
  const [showPreviewImage, setShowPreviewImage] = useState(false);

  const handleClose = () => {
    setShowPreviewImage(false);
  };

  return (
    <div className="w-full pt-8">
      <div
        onClick={() => setShowPreviewImage(true)}
        className="aspect-auto cursor-pointer"
      >
        <LazyLoadImage effect="opacity" src={image || images[0]} />
      </div>

      <div className="grid lg:grid-cols-5 grid-cols-3 gap-2 py-5 mt-5">
        {images.map((item) => (
          <div
            onClick={() => setImage(item)}
            className={`aspect-auto border ${
              item === (image || images[0])
                ? "border-blue-500"
                : "border-transparent"
            } p-1 rounded-md`}
            key={item}
          >
            <LazyLoadImage effect="opacity" src={item} />
          </div>
        ))}
      </div>

      {showPreviewImage && (
        <ProductPreviewImage
          from={images.findIndex((item) => item === image) || 0}
          handleClose={handleClose}
          images={images}
        />
      )}
    </div>
  );
};

export default ProductImage;
