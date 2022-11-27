import React, { FC } from "react";
import { Attribute } from "../../../types";

interface ProductDetailsProps {
  attributes: Attribute[];
}

const ProductDetails: FC<ProductDetailsProps> = ({ attributes }) => {
  return (
    <div className="mt-4 bg-white p-4 md:w-[80%]">
      <h1 className="text-[20px] font-normal mb-4">Thông tin chi tiết</h1>
      <div>
        {attributes.map((item) => (
          <div key={item._id} className="flex">
            <div className="py-[10px] px-[15px] bg-gray-200 md:w-[220px] w-[50%]">
              <p className="text-[13px] font-medium">{item.name}</p>
            </div>
            <div className="py-[10px] px-[15px] bg-gray-100 flex-1">
              <p className="text-[13px] font-medium">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetails;
