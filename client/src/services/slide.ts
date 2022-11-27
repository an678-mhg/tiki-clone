import { Slide } from "../types";
import client from "../utils/axios";

export const getAllSlide = async (): Promise<Slide[]> => {
  const response = await client.get("/slide/gets");
  return response.data.slides;
};
