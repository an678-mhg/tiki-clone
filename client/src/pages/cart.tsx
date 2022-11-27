import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React from "react";
import { CircularProgress } from "react-cssfx-loading";
import CartEmty from "../components/Cart/CartEmty";
import CartItem from "../components/Cart/CartItem";
import Total from "../components/Cart/Total";
import HeaderOnlyLayout from "../components/Layout/HeaderOnlyLayout";
import { useAppSelector } from "../redux/hooks";
import privateRoute from "../utils/private";

const Cart = () => {
  const { cart, loading } = useAppSelector((state) => state.cart);

  return (
    <HeaderOnlyLayout>
      <div className="lg:pb-0 pb-4">
        <div className="py-4">
          <h4 className="text-[20px] font-medium uppercase">Giỏ hàng</h4>
        </div>

        {loading ? (
          <div className="bg-white p-10 flex items-center justify-center">
            <CircularProgress />
          </div>
        ) : (
          <div>
            {cart.length > 0 ? (
              <div>
                <div className="flex lg:flex-row flex-col">
                  <div className="flex-1 lg:mr-4 lg:mb-0 mb-3">
                    <div className="bg-white rounded-[4px]">
                      {cart.map((item, index) => (
                        <CartItem key={item._id} item={item} index={index} />
                      ))}
                    </div>
                  </div>

                  <Total />
                </div>
              </div>
            ) : (
              <CartEmty />
            )}
          </div>
        )}
      </div>
    </HeaderOnlyLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return privateRoute(context, "/cart");
};

export default Cart;
