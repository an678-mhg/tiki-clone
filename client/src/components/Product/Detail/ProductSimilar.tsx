import React, { FC } from "react";
import { Product } from "../../../types";
import GridLayout from "../../Layout/GridLayout";
import ProductItem from "../ProductItem";

interface ProductSimilarProps {
  similar: Product[];
}

const ProductSimilar: FC<ProductSimilarProps> = ({ similar }) => {
  return (
    <div className="mt-4 bg-white p-4">
      <h1 className="text-[20px] font-normal mb-4">Sản phẩm tương tự</h1>
      <GridLayout>
        {similar.map((item) => (
          <ProductItem key={item._id} product={item} />
        ))}
      </GridLayout>
    </div>
  );
};

export default ProductSimilar;
