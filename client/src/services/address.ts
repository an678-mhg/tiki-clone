import { Address } from "../types";
import client from "../utils/axios";

export const getAllAddress = async (): Promise<Address[]> => {
  const response = await client.get("/address/gets");
  return response.data.address;
};

export const addAddress = async (newAddress: Address): Promise<Address> => {
  const response = await client.post("/address/create", {
    ...newAddress,
    defaultAddress: newAddress.default,
  });
  return response.data.address;
};

export const updateAddressDefault = async (_id: string) => {
  const response = await client.put(`/address/edit/default/${_id}`);
  return response.data;
};

export const deleteAddress = async (_id: string) => {
  const response = await client.delete(`/address/delete/${_id}`);
  return response;
};

export const getAddress = async (_id: string): Promise<Address> => {
  const response = await client.get(`/address/get/${_id}`);
  return response.data.address;
};

export const updateAddress = async (newAddress: Address) => {
  const response = await client.put(
    `/address/edit/${newAddress._id}`,
    newAddress
  );
  return response.data;
};

export const getDefaultAddress = async (): Promise<Address> => {
  const response = await client.get("/address/default/get");
  return response.data.address;
};
