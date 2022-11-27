import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { AiFillCheckCircle, AiOutlineComment } from "react-icons/ai";
import { BiLike } from "react-icons/bi";
import StartCount from "../StartCount";
import ImageList from "./ImageList";

const ReviewItem = () => {
  return (
    <div className="border-b border-gray-200">
      <div className="md:px-[48px] md:py-[32px] p-4 flex">
        <div className="md:block hidden">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <LazyLoadImage
                src="https://ui-avatars.com/api/?name=NA&background=random"
                effect="opacity"
              />
            </div>
            <div className="ml-3">
              <p className="text-[15px] font-medium">Nguyen Quoc An</p>
              <p className="text-[13px] text-gray-500">
                Đã tham gia 4 tháng trước
              </p>
            </div>
          </div>

          <div className="mt-3">
            <p className="text-gray-500 text-[13px] font-normal flex items-center">
              <AiOutlineComment fontSize={20} className="text-gray-500 mr-2" />{" "}
              <span>Đã có: </span>
              <span className="text-black ml-1">52 lượt trả lời</span>
            </p>
            <p className="text-gray-500 text-[13px] font-normal flex items-center mt-3">
              <BiLike fontSize={20} className="text-gray-500 mr-2" />{" "}
              <span>Đã có: </span>
              <span className="text-black ml-1">18 lượt cảm ơn</span>
            </p>
          </div>
        </div>
        <div className="md:ml-[150px] flex-1">
          <div className="flex items-center">
            <StartCount fontSize={20} starts={5} />
            <p className="text-[15px] font-medium ml-3">Cực kì hài lòng</p>
          </div>

          <p className="text-[13px] font-normal mt-2 flex items-center text-green-500">
            <AiFillCheckCircle fontSize={15} className="text-green-500" />
            <span className="ml-1">Đã mua hàng</span>
          </p>

          <p className="mt-2 text-[13px] font-normal">
            Giao siêu nhanh vì mình chọn giao 2g :))) nhìn chung là clg không
            cần bàn, tính chờ mega để mua nhưng có việc gấp (do máy cũ hư) nên
            thôi. Tính thêm hoang astra thì còn tầm 30tr, khá là ổn áp cho dòng
            máy 2022
          </p>

          <div className="mt-2">
            <ImageList />
          </div>
          <div className="flex items-center mt-4">
            <button className="py-2 px-4 rounded-[4px] border border-blue-500 text-sm text-blue-500 flex items-center mr-3">
              <BiLike fontSize={20} className="mr-2" /> Hữu ích
            </button>
            <button className="py-2 px-4 rounded-[4px] text-sm text-blue-500 flex items-center">
              <AiOutlineComment fontSize={20} className="mr-2" /> Bình luận
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
