import React, { FC } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { CartItem } from "../../redux/slices/CartSlice";
import { formatPrices } from "../../utils/contants";

interface ProductCheckoutItemProps {
  item: CartItem;
}

const ProductCheckoutItem: FC<ProductCheckoutItemProps> = ({ item }) => {
  return (
    <div className="flex justify-between items-start p-4 border-b border-gray-200">
      <div className="flex flex-1">
        <div className="w-[80px] rounded-[4px]">
          <LazyLoadImage src={item.images[0]} effect="opacity" />
        </div>
        <div className="ml-3 flex-1">
          <h4 className="text-sm text-gray-600 font-semibold line-clamp-1">
            {item.name}
          </h4>
          <p className="text-[13px] text-gray-500 font-medium">
            x{item.quantity}
          </p>
          <p className="text-[13px] text-gray-500 font-medium">
            {formatPrices(item.prices - (item.prices * item.discount) / 100)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCheckoutItem;
