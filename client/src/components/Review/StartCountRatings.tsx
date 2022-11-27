import React, { FC } from "react";
import StartCount from "../StartCount";

interface StartCountRatingsProps {
  starts: number;
  count: number;
  percent?: number;
}

const StartCountRatings: FC<StartCountRatingsProps> = ({
  starts,
  count,
  percent,
}) => {
  return (
    <div className="flex items-center my-1">
      <div className="flex items-center mr-2">
        <StartCount starts={starts} />
      </div>
      <div className="md:w-[138px] w-full h-[6px] bg-gray-200 rounded-full relative overflow-hidden">
        <div
          style={{ width: (percent || 0) + "%" }}
          className="absolute top-0 bottom-0 bg-gray-400"
        />
      </div>
      <p className="ml-2 text-[11px] text-gray-500">{count}</p>
    </div>
  );
};

export default StartCountRatings;
