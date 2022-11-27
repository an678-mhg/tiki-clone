import Link from "next/link";
import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Header = () => {
  return (
    <div className="bg-white shadow-sm">
      <div className="h-[80px] w-full container flex items-center justify-between">
        <div className="flex items-end justify-center">
          <Link href="/">
            <a className="w-[60px] h-[40px] block">
              <LazyLoadImage src="/logo-tiki-blue.png" />
            </a>
          </Link>

          <div className="w-[1px] h-[32px] bg-blue-500 mx-4" />

          <h1 className="text-[24px] text-blue-500 font-normal">Thanh toán</h1>
        </div>
        <div className="bg-[#F0F8FF] border border-blue-200 flex items-center pl-2 pr-4 py-1 rounded-full">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
            <FaPhoneAlt fontSize={20} color="#fff" />
          </div>
          <div className="ml-3">
            <p className="text-lg text-blue-500 font-semibold">1900-6035</p>
            <p className="text-[13px] text-gray-500">8-21h, cả thứ 7 & cn</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
