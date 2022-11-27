import { AuthResponse, User } from "../types";
import client from "../utils/axios";

export const signIn = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const response = await client.post("/auth/sign-in", { email, password });
  return response.data;
};

export const signUp = async (
  email: string,
  username: string,
  password: string,
  avatar: string
): Promise<AuthResponse> => {
  const response = await client.post("/auth/sign-up", {
    email,
    password,
    username,
    avatar,
  });
  return response.data;
};

export const getUserInfo = async (): Promise<User> => {
  const response = await client.get("/auth");
  return response.data.user;
};

export const changePassword = async ({
  currentPassword,
  newPassword,
}: {
  currentPassword: string;
  newPassword: string;
}) => {
  const response = await client.put("/auth/change-password", {
    currentPassword,
    newPassword,
  });
  return response.data;
};
