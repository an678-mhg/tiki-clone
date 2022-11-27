import React, { useMemo } from "react";
import { useAppSelector } from "../../redux/hooks";
import { formatPrices } from "../../utils/contants";

const OrderInfo = () => {
  const { cart } = useAppSelector((state) => state.cart);

  const discount = useMemo(() => {
    return cart.reduce((final, item) => {
      final += item.prices * (item.discount / 100) * item.quantity;
      return final;
    }, 0);
  }, [cart]);

  const totalOrder = useMemo(() => {
    return cart.reduce((final, item) => {
      final +=
        (item.prices - item.prices * (item.discount / 100)) * item.quantity;
      return final;
    }, 0);
  }, [cart]);

  return (
    <div>
      <div className="bg-white rounded-[4px] p-4 mt-3">
        <div className="border-b border-gray-200 pb-3">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-light">Tổng sản phẩm</p>
            <p className="text-sm font-medium">{cart.length}</p>
          </div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-light">Giảm giá</p>
            <p className="text-sm font-medium">{formatPrices(discount)}</p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-3">
          <p className="text-sm font-light">Tổng</p>
          <p className="text-sm font-medium">{formatPrices(totalOrder)}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
