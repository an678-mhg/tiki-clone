import { Response } from "../types";
import client from "../utils/axios";

export interface UserInfo {
  email: string;
  phone: string;
  dateOfBirth: Date;
  avatar: File;
  gender: string;
  username: string;
}

export const editUserInfo = async (newInfo: UserInfo): Promise<Response> => {
  const response = await client.put("/user/edit", newInfo);
  return response.data;
};
