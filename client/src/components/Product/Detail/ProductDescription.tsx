import React, { FC } from "react";

interface ProductDescriptionProps {
  description: string;
}

const ProductDescription: FC<ProductDescriptionProps> = ({ description }) => {
  return (
    <div className="mt-4 bg-white p-4 md:w-[80%] max-w-full">
      <h1 className="text-[20px] font-normal mb-4">Mô tả về sản phẩm</h1>
      <div
        className="text-sm font-light"
        dangerouslySetInnerHTML={{ __html: description }}
      ></div>
    </div>
  );
};

export default ProductDescription;
