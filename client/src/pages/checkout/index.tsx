import React, { useState, useEffect } from "react";
import AddressDefault from "../../components/Cart/AddressDefault";
import { useAppSelector } from "../../redux/hooks";
import OrderInfo from "../../components/Cart/OrderInfo";
import Header from "../../components/Checkout/Header";
import PaymentItem from "../../components/Checkout/PaymentItem";
import ProductCheckoutItem from "../../components/Checkout/ProductCheckoutItem";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrder } from "../../services/order";
import LoadingButton from "../../components/LoadingButton";
import { Address } from "../../types";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const paymentMethods = [
  {
    icon: "https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-cod.svg",
    content: "Thanh toán tiền mặt khi nhận hàng",
    id: 1,
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/174/174861.png",
    content: "Thanh toán qua Paypal",
    id: 2,
  },
];

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState<number>(
    paymentMethods[0].id
  );

  const router = useRouter();

  const { cart } = useAppSelector((state) => state.cart);

  const { mutate, isLoading } = useMutation(createOrder, {
    onSuccess: () => {
      router.push("/checkout/success");
    },
    onError: () => {
      toast.error("Tạo đơn hàng thất bại!");
    },
  });

  const queryClient = useQueryClient();

  const handleCreateOrder = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!paymentMethod) {
      return;
    }

    if (cart.length === 0) {
      return;
    }
    const address = queryClient.getQueryData([
      "get-default-address",
    ]) as Address;

    mutate({
      address: address._id,
      products: cart.map((item) => ({
        product: item._id,
        quantity: item.quantity,
      })),
      paymentMethod,
    });
  };

  return (
    <form onSubmit={handleCreateOrder} className="bg-background-gray h-screen">
      <Header />

      <div className="container mt-5 flex">
        <div className="w-[60%]">
          <div className="bg-white rounded-[4px]">
            <h3 className="px-4 py-2 text-lg font-medium border-b border-gray-200">
              Thông tin người đặt hàng
            </h3>
            <AddressDefault />
          </div>
          <div className="bg-white rounded-[4px] mt-3">
            <h3 className="px-4 py-2 text-lg font-medium border-b border-gray-200">
              Chọn hình thức thanh toán
            </h3>
            <div className="p-4">
              {paymentMethods.map((item) => (
                <PaymentItem
                  paymentMethod={paymentMethod}
                  key={item.id}
                  item={item}
                  changePaymentMethod={(e) => {
                    setPaymentMethod(Number(e.target.value));
                  }}
                />
              ))}
            </div>
          </div>
          <div className="bg-white rounded-[4px] mt-3">
            <h3 className="px-4 py-2 text-lg font-medium border-b border-gray-200">
              Thông tin đơn hàng
            </h3>
            <OrderInfo />
          </div>
        </div>

        <div className="flex-1 ml-3">
          <div className="bg-white rounded-[4px]">
            <h3 className="px-4 py-2 text-lg font-medium border-b border-gray-200">
              Sản phẩm
            </h3>

            <div className="h-[450px] overflow-y-scroll">
              {cart.map((item) => (
                <ProductCheckoutItem item={item} key={item._id} />
              ))}
            </div>
          </div>
          <LoadingButton
            loading={isLoading}
            className="py-3 px-4 bg-red-500 text-white text-sm font-normal mt-3 rounded-[4px] w-full"
          >
            Mua hàng ({cart.length})
          </LoadingButton>
        </div>
      </div>
    </form>
  );
};

export default Checkout;
