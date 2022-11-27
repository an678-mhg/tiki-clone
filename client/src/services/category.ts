import { Category } from "../types";
import client from "../utils/axios";

export const getAllCategory = async (): Promise<Category[]> => {
  const response = await client.get("/category/gets");
  return response.data.categories;
};
