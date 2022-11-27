import React, { useState } from "react";
import { CircularProgress } from "react-cssfx-loading";
import NotAddress from "../../../../icons/NotAddress";
import {
  getAllAddress,
  updateAddressDefault,
} from "../../../../services/address";
import AddressItem from "./AddressItem";
import CreateNewAddress from "./CreateNewAddress";
import Header from "./Header";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Address } from "../../../../types";

const Address = () => {
  const { data, isLoading } = useQuery(["get-all-address"], getAllAddress);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const queryClient = useQueryClient();

  return (
    <div className="h-full flex flex-col">
      <Header openModal={openModal} />

      <div
        className={`flex justify-center ${
          data?.length === 0 && "items-center"
        } flex-1`}
      >
        {isLoading ? (
          <CircularProgress className="mt-5" />
        ) : (
          <div className="w-full flex justify-center">
            {data && data?.length > 0 ? (
              <div className="px-5 w-full">
                {data?.map((item) => (
                  <AddressItem key={item._id} data={item} />
                ))}
              </div>
            ) : (
              <div>
                <div className="w-[120px] h-[120px]">
                  <NotAddress />
                </div>
                <h1 className="text-gray-500 mt-2">Bạn chưa có địa chỉ.</h1>
              </div>
            )}
          </div>
        )}
      </div>

      {showModal && (
        <CreateNewAddress
          callbackHandler={(response) => {
            let newAddress = [
              ...(queryClient.getQueryData(["get-all-address"]) as Address[]),
              response,
            ];
            if (newAddress.length === 1) {
              console.log("update defAULT");
              newAddress = newAddress.map((item) =>
                item._id === response._id ? { ...item, default: true } : item
              );
              updateAddressDefault(response._id);
            }
            queryClient.setQueryData(["get-all-address"], newAddress);
          }}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default Address;
