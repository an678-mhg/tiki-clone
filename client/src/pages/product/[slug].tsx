import {
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
  GetStaticPaths,
} from "next";
import React from "react";
import Review from "../../components/Review";
import HeaderOnlyLayout from "../../components/Layout/HeaderOnlyLayout";
import ProductDescription from "../../components/Product/Detail/ProductDescription";
import ProductDetails from "../../components/Product/Detail/ProductDetails";
import ProductImage from "../../components/Product/Detail/ProductImage";
import ProductInfo from "../../components/Product/Detail/ProductInfo";
import ProductSimilar from "../../components/Product/Detail/ProductSimilar";
import { getProductDetail, getSimilarProduct } from "../../services/product";
import { Product } from "../../types";
import Meta from "../../components/Meta";

interface DetailProps {
  product: Product;
  similar: Product[];
}

const Detail: NextPage<DetailProps> = ({ product, similar }) => {
  return (
    <HeaderOnlyLayout>
      <Meta
        title={`${product.name} | Tiki`}
        description={product.description}
        image={product.images[0]}
      />

      <div className="bg-white flex mt-5 px-4 md:flex-row flex-col">
        <div className="md:w-[35%] w-full">
          <ProductImage images={product.images} />
        </div>
        <div className="flex-1 md:ml-4 ml-0 md:border-l border-gray-200">
          <ProductInfo product={product} />
        </div>
      </div>
      <ProductSimilar similar={similar} />
      <ProductDetails attributes={product.attributes} />
      <ProductDescription description={product.description} />
      <Review />
    </HeaderOnlyLayout>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const slug = params?.slug as string;
  try {
    const data = await Promise.all([
      getProductDetail(slug),
      getSimilarProduct(slug),
    ]);

    return {
      props: {
        product: data[0],
        similar: data[1],
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default Detail;
