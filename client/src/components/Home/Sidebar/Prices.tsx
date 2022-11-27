import { useRouter } from "next/router";
import React, { useState } from "react";
import SidebarItem from "./SidebarItem";

const Prices = () => {
  const router = useRouter();

  const [prices, setPrices] = useState({
    gte: Number(router.query.gte) || 0,
    lte: Number(router.query.lte) || 0,
  });

  const handleChangePrices = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrices({ ...prices, [e.target.name]: e.target.value });
  };

  const submitForm = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push({
      query: { ...router.query, gte: prices.gte, lte: prices.lte },
    });
  };

  return (
    <SidebarItem title="Giá">
      <div className="mt-2">
        <p className="text-xs text-gray-400 font-medium">Chọn khoảng giá</p>

        <form onSubmit={submitForm} className="mt-2">
          <div className="grid grid-cols-2 gap-4 relative">
            <div>
              <input
                onChange={handleChangePrices}
                name="gte"
                value={prices.gte}
                type="number"
                pattern="[0-9]*"
                className="border border-gray-400 rounded-[4px] w-full text-gray-600 text-[13px] px-2 py-1"
              />
            </div>
            <div>
              <input
                onChange={handleChangePrices}
                value={prices.lte}
                name="lte"
                type="number"
                pattern="[0-9]*"
                className="border border-gray-400 rounded-[4px] w-full text-gray-600 text-[13px] px-2 py-1"
              />
            </div>

            <span className="absolute w-[7px] h-[1px] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-gray-400" />
          </div>

          <button className="w-full border border-blue-500 py-1 px-4 mt-2 rounded-[4px] text-blue-500 text-xs">
            Áp dụng
          </button>
        </form>
      </div>
    </SidebarItem>
  );
};

export default Prices;
