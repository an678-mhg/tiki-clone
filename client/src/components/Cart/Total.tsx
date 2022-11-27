import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";
import toast from "react-hot-toast";
import { useAppSelector } from "../../redux/hooks";
import AddressDefault from "./AddressDefault";
import OrderInfo from "./OrderInfo";

const Total = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleNavigateToCheckout = () => {
    if (queryClient.getQueryData(["get-default-address"])) {
      router.push("/checkout");
    } else {
      toast.error("Bạn cần thêm địa chỉ giao hàng!");
    }
  };

  const { cart } = useAppSelector((state) => state.cart);

  return (
    <div className="lg:w-[310px]">
      <AddressDefault />
      <OrderInfo />
      <button
        onClick={handleNavigateToCheckout}
        className="py-3 px-4 bg-red-500 text-white text-sm font-normal mt-3 rounded-[4px] w-full"
      >
        Thanh toán ({cart.length})
      </button>
    </div>
  );
};

export default Total;
