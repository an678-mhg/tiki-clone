import { useRouter } from "next/router";
import React, { FC, useState } from "react";
import { CircularProgress } from "react-cssfx-loading";
import toast from "react-hot-toast";
import { AiFillStar, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { handleAddToCart } from "../../../redux/slices/CartSlice";
import { Product } from "../../../types";
import { formatPrices } from "../../../utils/contants";
import { BsCart3 } from "react-icons/bs";
import CartToast from "../../Toast/CartToast";
import Link from "next/link";
import StartCount from "../../StartCount";

interface ProductInfoProps {
  product: Product;
}

const ProductInfo: FC<ProductInfoProps> = ({ product }) => {
  const [counter, setCounter] = useState(1);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { user } = useAppSelector((state) => state.auth);

  const addToCart = async () => {
    if (!user)
      return router.push(
        `/auth/sign-in?redirect=${encodeURIComponent(router.asPath)}`
      );

    setLoading(true);
    await dispatch(handleAddToCart({ product, quantity: counter }));
    setLoading(false);
    toast.custom(<CartToast />);
  };

  return (
    <div className="py-4 md:pl-4">
      <div>
        <p className="font-normal text-[13px]">
          Thương hiệu:{" "}
          <Link href={{ pathname: "/", query: { brand: product.brand._id } }}>
            <a className="text-blue-500 hover:underline">
              {product.brand.name}
            </a>
          </Link>
        </p>
      </div>
      <div className="mt-2">
        <p className="text-2xl font-light">{product.name}</p>
      </div>
      <div className="mt-2 md:flex items-center">
        <div className="flex items-center">
          <StartCount starts={product?.review || 0} />
        </div>
        <div className="md:ml-2 md:mt-0 mt-2">
          <p className="text-gray-500 font-normal text-[15px]">
            Xem {product?.reviewCount || 0} đánh giá
          </p>
        </div>
      </div>
      <div className="mt-4 bg-gray-100 p-4 rounded-md">
        <div className="md:flex items-end">
          <p className="text-4xl font-medium text-red-500">
            {formatPrices(
              product.prices - (product.prices * product.discount) / 100
            )}
          </p>
          <p className="text-sm text-gray-500 md:ml-2 md:mt-0 mt-2">
            <span className="line-through">{formatPrices(product.prices)}</span>
            <span className="ml-2 text-red-500">-{product.discount}%</span>
          </p>
        </div>
      </div>

      <div className="mt-5">
        <p className="text-[15px] font-normal">
          Danh Mục:{" "}
          <Link
            href={{ pathname: "/", query: { category: product.category._id } }}
          >
            <a className="text-blue-500 hover:underline">
              {product.category.name}
            </a>
          </Link>
        </p>

        <div className="w-[84px] h-[84px] border border-blue-500 mt-4 rounded-md p-2">
          <LazyLoadImage effect="opacity" src={product.category.image} />
        </div>
      </div>

      <div className="mt-5">
        <p className="text-[15px]">Số Lượng</p>

        <div className="flex items-center mt-4">
          <button
            onClick={() =>
              setCounter((prev) => {
                if (prev <= 1) {
                  return 1;
                }
                return prev - 1;
              })
            }
            className="w-[30px] h-[30px] border border-gray-200 flex items-center justify-center"
          >
            <AiOutlineMinus />
          </button>
          <p className="w-[30px] h-[30px] border border-gray-200 flex items-center justify-center text-sm font-normal">
            {counter}
          </p>
          <button
            onClick={() => setCounter((prev) => prev + 1)}
            className="w-[30px] h-[30px] border border-gray-200 flex items-center justify-center"
          >
            <AiOutlinePlus />
          </button>
        </div>
      </div>

      <div className="mt-8 flex">
        <button
          disabled={loading}
          onClick={addToCart}
          className={`text-sm bg-red-500 text-white px-6 py-2 rounded-[4px] mr-5 ${
            loading && "opacity-70"
          }`}
        >
          {!loading ? (
            <BsCart3 className="text-white text-lg" />
          ) : (
            <span className="flex items-center">
              <CircularProgress color="#fff" width={20} height={20} />{" "}
            </span>
          )}
        </button>
        <button className="text-sm border border-blue-500 rounded-[4px] py-2 px-6 text-blue-500">
          Thêm vào mục yêu thích
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;
