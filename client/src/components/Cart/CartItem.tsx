import React, { FC, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useAppDispatch } from "../../redux/hooks";
import {
  CartItem,
  handleDeleteProductInCart,
  plus,
  minus,
} from "../../redux/slices/CartSlice";
import { formatPrices } from "../../utils/contants";
import { CircularProgress } from "react-cssfx-loading";
import swal from "sweetalert";
import { addCartQuantity, minusCartQuantity } from "../../services/cart";
import toast from "react-hot-toast";

interface CartItemProps {
  item: CartItem;
  index: number;
}

const CartItemComponent: FC<CartItemProps> = ({ item, index }) => {
  const dispatch = useAppDispatch();
  const [loadingDelete, setLoadingDelete] = useState(false);

  const minusQuantity = async () => {
    if (item.quantity <= 1) return;
    try {
      dispatch(minus(index));
      minusCartQuantity(item._id);
    } catch (error) {
      toast.error("Có lỗi xảy ra!");
    }
  };

  const addQuantity = async () => {
    try {
      dispatch(plus(index));
      addCartQuantity(item._id);
    } catch (error) {
      toast.error("Có lỗi xảy ra!");
    }
  };

  const deleteProductInCart = async () => {
    swal({
      title: "Giỏ hàng",
      text: "Bạn muốn xóa sản phẩm này khỏi giỏ hàng!",
      icon: "warning",
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        setLoadingDelete(true);
        await dispatch(handleDeleteProductInCart(item._id));
        setLoadingDelete(false);
      }
    });
  };

  return (
    <div className="mb-4 last:mb-0 border-b border-gray-200 px-4 md:py-2 py-4">
      <div className="flex md:items-center justify-between md:flex-row flex-col">
        <div className="flex items-center md:w-[30%]">
          <div className="w-[50px] aspect-auto">
            <LazyLoadImage src={item.images[0]} effect="opacity" />
          </div>

          <div className="flex items-center ml-4 flex-1">
            <h3 className="text-[13px] line-clamp-2">{item.name}</h3>
          </div>
        </div>
        <div className="flex items-center justify-between flex-1 md:ml-16 md:mt-0 mt-4">
          <div className="hidden items-center md:flex w-[20%]">
            <p className="text-[13px] font-medium">
              {formatPrices(item.prices)}
            </p>
          </div>
          <div className="flex items-center w-[20%]">
            <div className="flex items-center">
              <button
                onClick={minusQuantity}
                className="w-[30px] h-[30px] border border-gray-200 flex items-center justify-center"
              >
                <AiOutlineMinus />
              </button>
              <p className="w-[30px] h-[30px] border border-gray-200 flex items-center justify-center text-sm font-normal">
                {item.quantity}
              </p>
              <button
                onClick={addQuantity}
                className="w-[30px] h-[30px] border border-gray-200 flex items-center justify-center"
              >
                <AiOutlinePlus />
              </button>
            </div>
          </div>
          <div className="flex items-center w-[20%]">
            <p className="text-sm text-red-400 font-semibold">
              {formatPrices(item.prices - (item.prices * item.discount) / 100)}
            </p>
          </div>
          <button
            disabled={loadingDelete}
            className="flex items-center justify-center w-[10%]"
            onClick={deleteProductInCart}
          >
            {!loadingDelete ? (
              <LazyLoadImage
                effect="opacity"
                src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/trash.svg"
              />
            ) : (
              <CircularProgress width={15} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItemComponent;
