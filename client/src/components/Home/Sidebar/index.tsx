import React, { FC } from "react";
import Categories from "./Categories";
import Prices from "./Prices";
import Review from "./Review";

import { Brand, Category } from "../../../types";

interface SidebarProps {
  brands: Brand[];
  categories: Category[];
}

const Sidebar: FC<SidebarProps> = ({ brands, categories }) => {
  return (
    <div className="w-[200px] lg:block hidden">
      <div className="bg-white">
        {categories && (
          <Categories
            type="radio"
            name="category"
            categories={categories}
            title="Danh mục"
          />
        )}

        {brands && (
          <Categories
            type="checkbox"
            name="brand"
            categories={brands}
            title="Thương hiệu"
          />
        )}

        <Review />
        <Prices />
      </div>
    </div>
  );
};

export default Sidebar;
