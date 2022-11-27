import { PaginateResponse, Product } from "../types";
import client from "../utils/axios";

export const getAllProduct = async (
  sort: Number,
  category: string,
  brand: string,
  page: number = 1,
  limit: number = 5,
  starts: number | undefined = undefined,
  gte: number | undefined = undefined,
  lte: number | undefined = undefined
): Promise<PaginateResponse<Product>> => {
  const response = await client.get("/product/gets", {
    params: {
      sort,
      category,
      brand,
      page,
      limit,
      starts,
      gte,
      lte,
    },
  });
  return response.data;
};

export const getProductDetail = async (slug: string): Promise<Product> => {
  const response = await client.get(`/product/get/${slug}`);
  return response.data.product;
};

export const getSimilarProduct = async (slug: string): Promise<Product[]> => {
  const response = await client.get(`/product/similar/${slug}`);
  return response.data.products;
};
