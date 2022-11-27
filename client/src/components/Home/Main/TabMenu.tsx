import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useState, useEffect } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

const menus = [
  { name: "Giá thấp đến cao", sort: 1 },
  { name: "Giá cao xuống thấp", sort: -1 },
];

interface TabMenuProps {
  totalPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

const TabMenu: FC<TabMenuProps> = ({ totalPage, hasNextPage, hasPrevPage }) => {
  const router = useRouter();
  const { query } = router;
  const [page, setPage] = useState(1);

  const handleChangePage = (action: "next" | "prev") => {
    switch (action) {
      case "next": {
        if (!hasNextPage) break;
        setPage((prev) => prev + 1);
        break;
      }
      case "prev": {
        if (!hasPrevPage) break;
        setPage((prev) => prev - 1);
        break;
      }
      default: {
        throw new Error("action is not valid");
      }
    }
  };

  useEffect(() => {
    page !== 1 && router.push({ query: { ...router.query, page } });
  }, [page]);

  return (
    <div className="border-b border-gray-200 flex items-center justify-between pr-4">
      <ul className="flex">
        {menus.map((menu) => (
          <li className="py-3 px-4" key={menu.name}>
            <div>
              <Link href={{ query: { ...query, sort: menu.sort } }}>
                <a
                  className={`font-medium text-sm after:bg-blue-500 ${
                    (Number(query?.sort) ? Number(query?.sort) : 1) ===
                      menu.sort && "line text-blue-500"
                  }`}
                >
                  {menu.name}
                </a>
              </Link>
            </div>
          </li>
        ))}
      </ul>

      <div className="md:flex hidden items-center">
        <div>
          <p className="text-sm" style={{ userSelect: "none" }}>
            <span className="text-blue-500">{query?.page || 1}</span> /{" "}
            {totalPage}
          </p>
        </div>

        <div className="flex items-center ml-4">
          <SlArrowLeft
            onClick={() => handleChangePage("prev")}
            className="mr-2 text-sm font-medium cursor-pointer"
          />
          <SlArrowRight
            onClick={() => handleChangePage("next")}
            className="mr-2 text-sm font-medium cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default TabMenu;
