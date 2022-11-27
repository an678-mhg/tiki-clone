import { useRouter } from "next/router";
import React, { useState, ChangeEvent } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const searchKeyword = [
  "điện thoại iphone",
  "iphone 12 pro",
  "iphone",
  "13 pro max 128gb",
  "tecno pova 3",
  "iphone 11 pro max",
  "apple",
  "a23",
  "iphone 13 pro",
];

const SearchBox = () => {
  const [text, setText] = useState("");

  const router = useRouter();

  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push({
      query: {
        ...router.query,
        search: text,
      },
    });
  };

  return (
    <div className="flex-1 lg:mx-[70px] mx-[35px] md:block hidden">
      <form
        onSubmit={onSubmit}
        className="w-full rounded-sm overflow-hidden shadow-md flex"
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Tìm sản phẩm, danh mục hay thương hiệu mong muốn ..."
          type="text"
          className="px-4 py-2.5 flex-1 text-[13px]"
        />
        <button className="bg-primary-color-2 px-4 py-2.5 text-white items-center text-[13px] flex">
          <div className="w-5 h-5 lg:mr-2">
            <LazyLoadImage effect="opacity" src="/icon/search-icon.png" />
          </div>
          <span className="lg:block hidden">Tìm kiếm</span>
        </button>
      </form>

      <div className="hidden xl:flex items-center mt-3">
        {searchKeyword?.map((item) => (
          <p key={item} className="text-white text-[11px] mr-[12px] last:mr-0">
            {item}
          </p>
        ))}
      </div>
    </div>
  );
};

export default SearchBox;
