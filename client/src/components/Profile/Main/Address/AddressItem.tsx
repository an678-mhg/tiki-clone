import React, { useState } from "react";
import {
  deleteAddress,
  updateAddressDefault,
} from "../../../../services/address";
import { Address } from "../../../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { CircularProgress } from "react-cssfx-loading";
import swal from "sweetalert";
import CreateNewAddress from "./CreateNewAddress";

interface AddressItemProps {
  data: Address;
}

const AddressItem: React.FC<AddressItemProps> = ({ data }) => {
  const queryClient = useQueryClient();

  const [showModalCreate, setShowModalCreate] = useState(false);

  const openModal = () => setShowModalCreate(true);
  const closeModal = () => setShowModalCreate(false);

  const { mutate, isLoading } = useMutation(updateAddressDefault, {
    onSuccess: () => {
      const newAddress = (
        queryClient.getQueryData(["get-all-address"]) as Address[]
      )?.map((item) => {
        if (item._id === data?._id) {
          return {
            ...item,
            default: true,
          };
        }

        return {
          ...item,
          default: false,
        };
      });
      queryClient.setQueryData(["get-all-address"], newAddress);
      toast.success("Thay đổi địa chỉ mặc định thành công!");
    },
    onError: () => {
      toast.error("Thay đổi địa chỉ mặc định thất bại!");
    },
  });

  const { mutate: deleteAddressMuatate, isLoading: loadingDeleteAddress } =
    useMutation(deleteAddress, {
      onSuccess: () => {
        const newAddress = (
          queryClient.getQueryData(["get-all-address"]) as Address[]
        )?.filter((item) => item._id !== data?._id);
        queryClient.setQueryData(["get-all-address"], newAddress);
        toast.success("Xóa địa chỉ thành công");
      },
      onError: () => {
        toast.error("Xóa địa chỉ thất bại");
      },
    });

  return (
    <div className="border-b border-gray-200 w-full py-4">
      <div className="flex justify-between">
        <div>
          <h1 className="flex items-center line-clamp-1">
            {data?.name}
            <span className="inline-block mx-2">|</span>
            <span className="text-sm text-gray-500">{data?.phone}</span>
          </h1>
          <p className="text-sm text-gray-500 mt-1 line-clamp-1">
            {data?.address}
          </p>
          {data?.default && (
            <button className="text-blue-500 border border-blue-200 text-sm p-1 mt-2">
              Mặc định
            </button>
          )}
        </div>
        <div>
          <div className="flex gap-2">
            <button
              onClick={openModal}
              className="text-sm text-primary-color px-1"
            >
              Cập nhật
            </button>
            {!data?.default && (
              <button
                disabled={loadingDeleteAddress}
                onClick={() => {
                  swal({
                    title: "Địa chỉ",
                    text: "Bạn muốn xóa địa chỉ này!",
                    icon: "warning",
                    dangerMode: true,
                  }).then(async (willDelete) => {
                    if (willDelete) {
                      deleteAddressMuatate(data?._id);
                    }
                  });
                }}
                className="text-sm text-primary-color px-1"
              >
                {loadingDeleteAddress ? (
                  <div className="flex items-center">
                    <CircularProgress width={20} height={20} />
                  </div>
                ) : (
                  "Xóa"
                )}
              </button>
            )}
          </div>
          <button
            style={{
              cursor: data?.default ? "not-allowed" : "pointer",
            }}
            disabled={data?.default || isLoading}
            onClick={() => {
              mutate(data?._id);
            }}
            className="text-gray-500 border border-gray-200 text-sm p-2 mt-2"
          >
            {isLoading ? (
              <div className="flex items-center">
                <CircularProgress width={20} height={20} className="mr-2" /> Vui
                lòng đợi
              </div>
            ) : (
              "Thiết lập mặc định"
            )}
          </button>
        </div>
      </div>

      {showModalCreate && (
        <CreateNewAddress closeModal={closeModal} _id={data?._id} />
      )}
    </div>
  );
};

export default AddressItem;
