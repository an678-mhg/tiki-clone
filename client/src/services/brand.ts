import { Brand } from "../types";
import client from "../utils/axios";

export const getAllBrand = async (): Promise<Brand[]> => {
  const response = await client.get("/brand/gets");
  return response.data.brands;
};
