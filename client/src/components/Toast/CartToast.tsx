import { useRouter } from "next/router";
import React from "react";
import toast from "react-hot-toast";

const CartToast = () => {
  const router = useRouter();

  const handleComeCart = () => {
    router.push("/cart");
    toast.dismiss();
  };

  return (
    <div
      className={`max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 animate-leave`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">Giỏ hàng</p>
            <p className="mt-1 text-sm text-gray-500">
              Sản phẩm đã được thêm vào giỏ!
            </p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-200">
        <button
          onClick={handleComeCart}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Xem giỏ hàng
        </button>
      </div>
    </div>
  );
};

export default CartToast;
