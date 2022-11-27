import Link from "next/link";
import React from "react";
import { useAppSelector } from "../../redux/hooks";
import Tippy from "@tippyjs/react/headless";
import MenuUser from "./MenuUser";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Account = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { cart } = useAppSelector((state) => state.cart);

  return (
    <div className="flex flex-col justify-between">
      <div className="py-1 flex items-start cursor-pointer">
        <div className="mr-5 items-center md:flex hidden">
          <div
            className={`w-8 h-8 mr-2 ${
              user?.avatar && "rounded-full overflow-hidden"
            }`}
          >
            <LazyLoadImage
              effect="opacity"
              src={!user?.avatar ? "/icon/user-icon.png" : user?.avatar}
            />
          </div>

          <div className="text-white">
            <p className="text-[11px]">Tài khoản</p>
            <Tippy
              interactive
              render={(attrs) => user && <MenuUser {...attrs} />}
            >
              <div className="flex">
                <div className="text-[13px] font-normal">
                  {!user ? (
                    <Link href="/auth/sign-in">
                      <a>Đăng nhập / Đăng ký</a>
                    </Link>
                  ) : (
                    <p className="font-semibold line-clamp-1">
                      {user.username}
                    </p>
                  )}
                </div>
                <LazyLoadImage
                  effect="opacity"
                  className="w-4 h-4"
                  src="/icon/select-icon.png"
                />
              </div>
            </Tippy>
          </div>
        </div>

        <Link href="/cart">
          <a>
            <div className="flex items-end">
              <div className="w-8 h-8 mr-2 relative">
                <LazyLoadImage effect="opacity" src="/icon/cart-icon.png" />
                <div className="absolute bg-yellow-cart text-white top-[-2px] left-[20px] text-[13px] w-5 h-5 flex items-center justify-center rounded-full">
                  {cart.length}
                </div>
              </div>
              <p className="text-[12px] text-white">Giỏ hàng</p>
            </div>
          </a>
        </Link>
      </div>

      <div className="w-full text-right md:block hidden">
        <div className="text-[12px] text-white bg-white-overlay rounded-[10px] px-2 py-0.5 inline-block">
          <p className="flex items-center">
            <LazyLoadImage
              effect="opacity"
              src="https://frontend.tikicdn.com/_desktop-next/static/img/icon-seller.svg"
              className="w-3 h-3 mr-1"
            />
            <span>Bán hàng cùng Tiki</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Account;
