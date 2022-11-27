import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { RiNotification4Line } from "react-icons/ri";
import { IoMdListBox } from "react-icons/io";
import Link from "next/link";
import { useRouter } from "next/router";

const sidebarData = [
  {
    name: "Thông tin cá nhân",
    icon: <AiOutlineUser className="mr-2 text-blue-500" fontSize={20} />,
    children: [
      {
        name: "Hồ sơ",
        href: "/user/profile",
      },
      {
        name: "Đổi mật khẩu",
        href: "/user/profile/change-password",
      },
      {
        name: "Địa chỉ",
        href: "/user/profile/address",
      },
    ],
  },
  {
    name: "Đơn mua",
    icon: <IoMdListBox className="mr-2 text-orange-500" fontSize={20} />,
  },
];

const MainSidebar = () => {
  const router = useRouter();

  return (
    <div className="mt-[27px]">
      <ul>
        {sidebarData.map((item) => (
          <li key={item.name} className="mb-3">
            <div className={`flex items-center ${item.children && "mb-3"}`}>
              {item.icon}{" "}
              <span className="text-sm font-normal">{item.name}</span>
            </div>

            {item?.children && (
              <ul>
                {item.children?.map((item) => (
                  <li key={item.name} className="mb-3">
                    <Link href={item.href}>
                      <a
                        className={`text-sm ml-[28px] block ${
                          router.asPath.split("?")[0] === item.href &&
                          "text-primary-color"
                        }`}
                      >
                        {item.name}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MainSidebar;
