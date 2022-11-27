import React from "react";

const filterReview = [
  "Mới nhất",
  "Có hình ảnh",
  "5 sao",
  "4 sao",
  "3 sao",
  "2 sao",
  "1 sao",
];

const FilterReview = () => {
  return (
    <div className="pt-[48px] pb-[32px] items-center flex">
      <div className="flex items-center flex-wrap gap-2">
        {filterReview.map((item) => (
          <p
            className="bg-gray-200 rounded-full py-2 px-4 text-sm font-medium"
            key={item}
          >
            {item}
          </p>
        ))}
      </div>
    </div>
  );
};

export default FilterReview;
