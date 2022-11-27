import client from "../utils/axios";

export const getAllReview = async (product: string) => {
  const response = await client.get(`/review/gets/${product}`);
  return response.data;
};
