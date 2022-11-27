import client from "../utils/axios";

export const addToCart = async (
  productId: string,
  quantity: number
): Promise<boolean> => {
  const response = await client.put("/cart/edit", {
    product: productId,
    quantity,
  });
  return response.data.success;
};

export const getAllCart = async () => {
  const response = await client.get("/cart/get");
  return response.data;
};

export const addCartQuantity = async (productId: string): Promise<boolean> => {
  const response = await client.put(`/cart/plus/${productId}`);
  return response.data.success;
};

export const minusCartQuantity = async (
  productId: string
): Promise<boolean> => {
  const response = await client.put(`/cart/minus/${productId}`);
  return response.data.success;
};

export const deleteProductInCart = async (
  productId: string
): Promise<boolean> => {
  const response = await client.put(`/cart/delete/${productId}`);
  return response.data.success;
};
