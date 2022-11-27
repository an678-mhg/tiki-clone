import { Order } from "../types";
import client from "../utils/axios";

interface CreateOrder {
  products: { product: string; quantity: number }[];
  address: string;
  paymentMethod: number;
}

export const createOrder = async (newOrder: CreateOrder): Promise<Order> => {
  const { products, address, paymentMethod } = newOrder;
  const response = await client.post("/order/create", {
    products: products,
    address: address,
    paymentMethod: paymentMethod,
  });
  return response.data.order;
};
