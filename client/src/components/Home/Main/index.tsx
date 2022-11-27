import React, { FC } from "react";
import Banner from "./Banner";
import TabMenu from "./TabMenu";
import GridLayout from "../../Layout/GridLayout";
import ProductItem from "../../Product/ProductItem";
import { PaginateResponse, Product, Slide } from "../../../types";
import NoResult from "../../NoResult";

interface MainProps {
  products: PaginateResponse<Product>;
  slides: Slide[];
}

const Main: FC<MainProps> = ({ products, slides }) => {
  return (
    <div className="lg:ml-2 ml-0 lg:w-[calc(100%-208px)] w-full">
      <div className="bg-white">
        {slides.length > 0 && <Banner slides={slides} />}

        <TabMenu
          hasPrevPage={products.hasPrevPage}
          hasNextPage={products.hasNextPage}
          totalPage={products?.totalPages}
        />

        {products.docs.length > 0 ? (
          <GridLayout className="mt-2">
            {products?.docs?.map((product) => (
              <ProductItem key={product._id} product={product} />
            ))}
          </GridLayout>
        ) : (
          <NoResult />
        )}
      </div>
    </div>
  );
};

export default Main;
