import Link from "next/link";
import React from "react";
import { GrEdit } from "react-icons/gr";
import { BiLogInCircle } from "react-icons/bi";
import { useAppDispatch } from "../../redux/hooks";
import { deleteCookie } from "cookies-next";
import { KEY_TOKEN } from "../../utils/contants";
import { logOut } from "../../redux/slices/AuthSlice";
import { setCart } from "../../redux/slices/CartSlice";

const MenuUser = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logOut());
    dispatch(setCart([]));
    deleteCookie(KEY_TOKEN);
  };

  return (
    <div className="bg-white rounded-[4px] overflow-hidden shadow-md">
      <ul>
        <li className="border-b border-gray-200">
          <Link href="/user/profile">
            <a className="text-black text-[13px] font-normal flex items-center px-4 py-2">
              <GrEdit className="text-sm mr-2" /> Chỉnh sửa thông tin
            </a>
          </Link>
        </li>
        <li className="border-b border-gray-200 cursor-pointer">
          <button
            onClick={handleLogout}
            className="text-black text-[13px] font-normal flex items-center px-4 py-2"
          >
            <BiLogInCircle className="text-sm mr-2" /> Đăng xuất
          </button>
        </li>
      </ul>
    </div>
  );
};

export default MenuUser;
