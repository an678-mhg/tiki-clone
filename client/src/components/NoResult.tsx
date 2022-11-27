import React from "react";
import { AiFillInfoCircle } from "react-icons/ai";

const NoResult = () => {
  return (
    <div className="py-3 px-5 border border-yellow-300 flex items-center">
      <AiFillInfoCircle className="text-orange-400 text-2xl mr-3" />
      <p className="text-orange-400 text-sm">
        Rất tiếc, không tìm thấy sản phẩm phù hợp với lựa chọn của bạn
      </p>
    </div>
  );
};

export default NoResult;
