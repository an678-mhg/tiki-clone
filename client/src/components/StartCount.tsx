import React, { FC } from "react";
import { AiFillStar } from "react-icons/ai";

interface StartCountProps {
  starts: number;
  fontSize?: number;
}

const StartCount: FC<StartCountProps> = ({ starts, fontSize }) => {
  return (
    <>
      {[1, 2, 3, 4, 5].map((_, index) => (
        <AiFillStar
          fontSize={fontSize || 14}
          key={index}
          className={`${
            index < starts ? "text-yellow-300" : "text-gray-300"
          } mr-0.5 last:mr-0`}
        />
      ))}
    </>
  );
};

export default StartCount;
