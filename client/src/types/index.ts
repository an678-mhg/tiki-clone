import React from "react";
import { CartItem } from "../redux/slices/CartSlice";

export interface Category {
  _id: string;
  name: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface Brand {
  _id: string;
  name: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface Attribute {
  name: string;
  description: string;
  _id: string;
}

export interface Product {
  _id: string;
  name: string;
  images: string[];
  category: Category;
  brand: Brand;
  prices: number;
  discount: number;
  description: string;
  attributes: Attribute[];
  status: boolean;
  review: number;
  reviewCount: number;
  createdAt: Date;
  updatedAt: Date;
  slug: string;
  __v: number;
}

export interface PaginateResponse<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage?: any;
  nextPage?: any;
}

export interface Response {
  success: boolean;
  message: string;
}

export interface AuthResponse extends Response {
  token?: string;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  phone: string;
  gender: string;
  status: boolean;
  isAdmin: boolean;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface Slide {
  _id: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface Layout {
  children: React.ReactNode;
}

export interface Address {
  _id: string;
  name: string;
  phone: string;
  address: string;
  user: string;
  default: boolean;
}

export interface Order {
  user: User;
  address: Address;
  paymentMethod: number;
  total: number;
  products: CartItem[];
  status: "Chờ xác nhận" | "Chờ lấy hàng" | "Đang giao" | "Đã giao" | "Đã hủy";
  isPaid: boolean;
}
