import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAppSelector } from "../../../../redux/hooks";
import {
  addAddress,
  getAddress,
  updateAddress,
} from "../../../../services/address";
import { Address } from "../../../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { CircularProgress } from "react-cssfx-loading";
import LoadingButton from "../../../LoadingButton";

interface CreateNewAddressProps {
  closeModal: () => void;
  _id?: string;
  defaultAddress?: boolean;
  callbackHandler?: (response: Address) => void;
}

const CreateNewAddress: React.FC<CreateNewAddressProps> = ({
  closeModal,
  _id,
  defaultAddress,
  callbackHandler,
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      address: "",
      phone: "",
    },
  });

  const queryClient = useQueryClient();

  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      if (!_id) return;
      try {
        const address = await getAddress(_id);
        setValue("address", address.address);
        setValue("name", address.name);
        setValue("phone", address.phone);
      } catch (error) {
        toast.error("Có lỗi xảy ra!");
        closeModal();
      }
    })();
  }, [_id]);

  const { mutate, isLoading } = useMutation(addAddress, {
    onSuccess: (response) => {
      callbackHandler && callbackHandler(response);
      closeModal();
      toast.success("Thêm mới địa chỉ thành công");
    },
    onError: () => {
      closeModal();
      toast.error("Thêm mới địa chỉ thất bại");
    },
  });

  const { mutate: updateAddressMutate, isLoading: loadingUpdateAddress } =
    useMutation(updateAddress, {
      onSuccess: (_, body) => {
        const newAddress = (
          queryClient.getQueryData(["get-all-address"]) as Address[]
        ).map((item) => {
          if (item._id === body._id) {
            return {
              ...item,
              ...body,
            };
          }
          return item;
        });
        queryClient.setQueryData(["get-all-address"], newAddress);
        closeModal();
        toast.success("Cập nhật thành công địa chỉ");
      },
      onError: () => {
        closeModal();
        toast.error("Cập nhật thất bại địa chỉ");
      },
    });

  const submitForm = async (values: any) => {
    if (_id) {
      updateAddressMutate({ ...values, user: user?._id, _id });
    } else {
      mutate({
        ...values,
        user: user?._id,
        default: defaultAddress ? true : false,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      onClick={closeModal}
      className="fixed flex items-center justify-center inset-0 bg-[rgba(0,0,0,0.195)] opacity-animation"
    >
      <div onClick={(e) => e.stopPropagation()} className="p-8">
        <div className="w-[500px] bg-white p-5 text-xl modal-animation">
          <h1>Địa chỉ mới</h1>

          <div className="grid grid-cols-2 gap-4 w-full mt-8">
            <div>
              <input
                {...register("name", {
                  required: { value: true, message: "Trường này là bắt buộc!" },
                  minLength: {
                    value: 10,
                    message: "Tên phải có tối đa 10 kí tự",
                  },
                })}
                placeholder="Họ và tên..."
                className="px-4 py-2 border border-gray-200 w-full text-sm"
              />
              {errors && errors?.name && (
                <span className="mt-1 text-red-500 text-sm font-normal">
                  {errors?.name?.message}
                </span>
              )}
            </div>
            <div>
              <input
                {...register("phone", {
                  required: { value: true, message: "Trường này là bắt buộc!" },
                  minLength: {
                    value: 10,
                    message: "Số điện thoại phải có tối đa 10 kí tự",
                  },
                  pattern: {
                    value: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
                    message: "Số điện thoại không đúng định dạng!",
                  },
                })}
                placeholder="Số điện thoại..."
                className="px-4 py-2 border border-gray-200 w-full text-sm"
              />
              {errors && errors?.phone && (
                <span className="mt-1 text-red-500 text-sm font-normal">
                  {errors?.phone?.message}
                </span>
              )}
            </div>
          </div>

          <div className="mt-4">
            <input
              {...register("address", {
                required: { value: true, message: "Trường này là bắt buộc!" },
                minLength: {
                  value: 10,
                  message: "Địa chỉ phải có tối đa 10 kí tự",
                },
              })}
              placeholder="Địa chỉ đầy đủ..."
              className="px-4 py-2 border border-gray-200 w-full text-sm"
            />
            {errors && errors?.address && (
              <span className="mt-1 text-red-500 text-sm font-normal">
                {errors?.address?.message}
              </span>
            )}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={closeModal}
              className="text-sm border border-primary-color text-primary-color px-4 py-2 w-full"
            >
              Thoát
            </button>
            <LoadingButton
              loading={loadingUpdateAddress || isLoading}
              className="text-sm bg-primary-color text-white px-4 py-2 w-full"
            >
              Lưu
            </LoadingButton>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateNewAddress;
