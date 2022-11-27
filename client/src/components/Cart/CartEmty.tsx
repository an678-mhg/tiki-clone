import Link from "next/link";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const CartEmty = () => {
  return (
    <div className="bg-white flex items-center justify-center p-10">
      <div className="flex flex-col items-center justify-center">
        <div className="w-[190px]">
          <LazyLoadImage effect="opacity" src="/cart-emty.png" />
        </div>

        <h3 className="text-sm font-normal mt-5">
          Không có sản phẩm nào trong giỏ hàng
        </h3>

        <Link href="/">
          <a className="text-sm bg-yellow-400 px-10 py-2 mt-5 rounded-[4px] text-white">
            Tiếp tục mua hàng
          </a>
        </Link>
      </div>
    </div>
  );
};

export default CartEmty;
