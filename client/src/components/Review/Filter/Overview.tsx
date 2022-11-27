import React from "react";
import StartCount from "../../StartCount";
import StartCountRatings from "../StartCountRatings";

const Overview = () => {
  return (
    <div className="md:w-auto w-full">
      <div className="flex items-center">
        <p className="text-[32px] mr-4 font-bold">4.8</p>
        <div>
          <div className="flex items-center">
            <StartCount fontSize={25} starts={5} />
          </div>
          <p className="text-[13px] text-gray-500 mt-2">21 Đánh giá</p>
        </div>
      </div>

      <div className="mt-4">
        <StartCountRatings percent={70} count={18} starts={5} />
        <StartCountRatings percent={20} count={18} starts={4} />
        <StartCountRatings percent={10} count={18} starts={3} />
        <StartCountRatings count={18} starts={2} />
        <StartCountRatings count={18} starts={1} />
      </div>

      <button className="mt-5 border border-blue-200 px-4 py-2 w-full rounded-md text-sm text-blue-500">
        Viết đánh giá về sản phẩm
      </button>
    </div>
  );
};

export default Overview;
