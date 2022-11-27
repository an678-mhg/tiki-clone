import { useRouter } from "next/router";
import React from "react";
import StartCount from "../../StartCount";
import SidebarItem from "./SidebarItem";

const Review = () => {
  const router = useRouter();

  const handleFilterWithStarts = (starts: number) => {
    router.push({ query: { ...router.query, starts } });
  };

  return (
    <SidebarItem title="Đánh giá">
      <ul className="mt-2">
        <div
          onClick={() => handleFilterWithStarts(5)}
          className="flex items-center mb-2 cursor-pointer last:mb-0"
        >
          <StartCount starts={5} />
          <p className="text-xs text-gray-600 ml-1">Từ 5 sao</p>
        </div>
        <div
          onClick={() => handleFilterWithStarts(4)}
          className="flex items-center mb-2 cursor-pointer last:mb-0"
        >
          <StartCount starts={4} />
          <p className="text-xs text-gray-600 ml-1">Từ 4 sao</p>
        </div>
        <div
          onClick={() => handleFilterWithStarts(3)}
          className="flex items-center mb-2 cursor-pointer last:mb-0"
        >
          <StartCount starts={3} />
          <p className="text-xs text-gray-600 ml-1">Từ 3 sao</p>
        </div>
        <div
          onClick={() => handleFilterWithStarts(2)}
          className="flex items-center mb-2 cursor-pointer last:mb-0"
        >
          <StartCount starts={2} />
          <p className="text-xs text-gray-600 ml-1">Từ 2 sao</p>
        </div>
        <div
          onClick={() => handleFilterWithStarts(1)}
          className="flex items-center mb-2 cursor-pointer last:mb-0"
        >
          <StartCount starts={1} />
          <p className="text-xs text-gray-600 ml-1">Từ 1 sao</p>
        </div>
      </ul>
    </SidebarItem>
  );
};

export default Review;
