import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";

interface HeaderProps {
  openModal: () => void;
}

const Header: React.FC<HeaderProps> = ({ openModal }) => {
  const router = useRouter();

  return (
    <div className="p-4 flex items-center justify-between border-b border-gray-200">
      <h1 className="text-lg">Địa chỉ của tôi</h1>

      <div className="flex items-center gap-2">
        <button
          onClick={openModal}
          className="flex items-center px-4 py-2 bg-primary-color text-white text-sm"
        >
          <AiOutlinePlus className="text-white mr-2" fontSize={20} /> Thêm địa
          chỉ mới
        </button>
        {router.query?.redirect && (
          <Link href={router.query?.redirect as string}>
            <a className="flex items-center px-4 py-2 bg-yellow-cart text-white text-sm">
              <BiArrowBack className="text-white mr-2" fontSize={20} /> Trở về
            </a>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
