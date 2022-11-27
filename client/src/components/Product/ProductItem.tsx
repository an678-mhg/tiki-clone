import React, { FC } from "react";
import { Product } from "../../types";
import { formatPrices } from "../../utils/contants";
import { AiFillStar } from "react-icons/ai";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Link from "next/link";

interface ProductItemProps {
  product: Product;
}

const ProductItem: FC<ProductItemProps> = ({ product }) => {
  return (
    <Link href={`/product/${product.slug}`}>
      <a className="rounded-[4px] overflow-hidden border border-gray-100 cursor-pointer block">
        <div className="w-full aspect-[16/9] relative">
          <LazyLoadImage
            alt={product.name}
            effect="opacity"
            src={product.images[0]}
          />
          <div className="w-[68px] aspect-auto absolute top-0 left-0">
            <LazyLoadImage effect="opacity" src="/official.png" />
          </div>
        </div>
        <div className="p-3">
          <h3 className="text-[13px] font-normal line-clamp-1">
            {product.name}
          </h3>
          <div className="font-semibold text-red-500 mt-2 flex items-center">
            <p>{formatPrices(product.prices)}</p>
            <span className="ml-2 text-sm text-red-500 bg-red-overlay py-0.5 px-1 rounded-sm">
              -{product.discount}%
            </span>
          </div>
          <p className="flex items-center text-[13px] font-normal mt-2 text-orange-500">
            {product.review} <AiFillStar className="mx-2" />{" "}
            <span className="text-gray-400">({product.reviewCount})</span>
          </p>
        </div>
      </a>
    </Link>
  );
};

export default ProductItem;
