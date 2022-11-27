import client from "./axios";

export const formatPrices = (price: number) => {
  return new Intl.NumberFormat("vi-VI", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

export const KEY_TOKEN = "token";
export const BASE_URL = "https://tiki-fake.vercel.app";

export const setTokenServer = (token: string) => {
  if (token) {
    client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete client.defaults.headers.common["Authorization"];
  }
};

export const getPathSignIn = (asPath: string) => {
  return `/auth/sign-in?redirect=${encodeURIComponent(asPath)}`;
};

export const genarateName = (username: string) => {
  const firstLetters = username.split(" ")[0].charAt(0).toUpperCase();
  const secondLetters = username
    .split(" ")
    [username.split(" ").length - 1].charAt(0)
    .toLocaleUpperCase();
  return firstLetters + (secondLetters === firstLetters ? "" : secondLetters);
};

export const genarateAvatar = (username: string) => {
  return `https://ui-avatars.com/api/?name=${genarateName(
    username
  )}&background=random`;
};
