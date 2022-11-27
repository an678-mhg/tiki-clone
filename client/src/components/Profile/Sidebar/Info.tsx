import React from "react";
import { BsPencilFill } from "react-icons/bs";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { useAppSelector } from "../../../redux/hooks";

const Info = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="flex items-center py-3">
      <div className="w-12 h-12">
        <LazyLoadImage
          effect="opacity"
          src={user?.avatar}
          className="rounded-full"
        />
      </div>

      <div className="ml-3">
        <h3 className="text-sm font-semibold mb-[5px]">{user?.username}</h3>
        <p className="text-gray-400 font-normal flex items-center text-sm">
          <BsPencilFill className="mr-1" /> <span>Sửa hồ sơ</span>
        </p>
      </div>
    </div>
  );
};

export default Info;
