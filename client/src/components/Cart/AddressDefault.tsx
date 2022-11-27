import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { CircularProgress } from "react-cssfx-loading";
import { getDefaultAddress } from "../../services/address";
import CreateNewAddress from "../Profile/Main/Address/CreateNewAddress";

const AddressDefault = () => {
  const { data, isLoading } = useQuery(
    ["get-default-address"],
    getDefaultAddress
  );

  const router = useRouter();

  const [showModalCreate, setShowModalCreate] = useState(false);

  const queryClient = useQueryClient();

  return (
    <div>
      {isLoading ? (
        <div className="bg-white rounded-[4px] p-4 flex justify-center">
          <CircularProgress />
        </div>
      ) : (
        <div>
          {data ? (
            <div className="bg-white rounded-[4px] p-4">
              <div className="flex items-center justify-between">
                <p className="text-[16px] text-gray-500 font-normal">
                  Giao tới
                </p>

                <Link
                  href={`/user/profile/address?redirect=${encodeURIComponent(
                    router.asPath
                  )}`}
                >
                  <a className="text-sm text-blue-500">Thay đổi</a>
                </Link>
              </div>
              <div className="mt-2">
                <span className="text-sm font-semibold border-r border-gray-200 inline-block pr-2">
                  {data?.name}
                </span>
                <span className="text-sm font-semibold inline-block pl-2">
                  {data?.phone}
                </span>
              </div>
              <div className="mt-1">
                <p className="text-sm text-gray-500">
                  <span className="inline-block py-0.3 px-1 rounded-md text-green-400 text-[12px] mr-2 bg-[rgb(239,255,244)]">
                    Mặc định
                  </span>
                  <span className="line-clamp-1 mt-1">{data?.address}</span>
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-[4px] p-4 flex justify-center text-sm text-gray-500">
              Thêm mới
              <button
                onClick={() => setShowModalCreate(true)}
                className="text-blue-500 underline ml-1"
              >
                địa chỉ
              </button>
            </div>
          )}
        </div>
      )}

      {showModalCreate && (
        <CreateNewAddress
          callbackHandler={(response) => {
            queryClient.setQueryData(["get-default-address"], response);
          }}
          closeModal={() => setShowModalCreate(false)}
          defaultAddress={true}
        />
      )}
    </div>
  );
};

export default AddressDefault;
