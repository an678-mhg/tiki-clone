import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { changePassword } from "../../../../services/auth";
import { Response } from "../../../../types";
import LoadingButton from "../../../LoadingButton";

const FormChangePassword = () => {
  const {
    watch,
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const password = useRef("");
  password.current = watch("newPassword", "");

  const { mutate, isLoading } = useMutation(changePassword, {
    onSuccess: (response) => {
      toast.success(response?.message);
      setValue("confirmPassword", "");
      setValue("currentPassword", "");
      setValue("newPassword", "");
    },
    onError: (error) => {
      const errorMess = (error as AxiosError<Response>).response?.data
        ?.message as string;
      toast.error(errorMess);
    },
  });

  const submitForm = (values: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    mutate({
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
    });
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className="px-5 mt-6">
      <div className="text-sm text-gray-500 w-full mb-[30px]">
        <label className="inline-block text-right mb-3">Mật khẩu cũ</label>
        <div>
          <input
            type="password"
            {...register("currentPassword", {
              required: { value: true, message: "Trường này là bắt buộc" },
              minLength: {
                value: 6,
                message: "Mật khẩu có ít nhất 6 kí tự",
              },
            })}
            className="text-black border border-gray-200 py-2 px-4 w-full"
          />
          {errors && errors?.currentPassword && (
            <span className="mt-1 inline-block text-red-500 text-sm font-normal">
              {errors?.currentPassword?.message}
            </span>
          )}
        </div>
      </div>
      <div className="text-sm text-gray-500 w-full mb-[30px]">
        <label className="inline-block text-right mb-3">Mật khẩu mới</label>
        <div>
          <input
            type="password"
            {...register("newPassword", {
              required: { value: true, message: "Trường này là bắt buộc" },
              minLength: {
                value: 6,
                message: "Mật khẩu có ít nhất 6 kí tự",
              },
            })}
            className="text-black border border-gray-200 py-2 px-4 w-full"
          />
          {errors && errors?.newPassword && (
            <span className="mt-1 inline-block text-red-500 text-sm font-normal">
              {errors?.newPassword?.message}
            </span>
          )}
        </div>
      </div>
      <div className="text-sm text-gray-500 w-full mb-[30px]">
        <label className="inline-block text-right mb-3">
          Xác nhận lại mật khẩu
        </label>
        <div>
          <input
            type="password"
            {...register("confirmPassword", {
              required: { value: true, message: "Trường này là bắt buộc" },
              minLength: {
                value: 6,
                message: "Mật khẩu có ít nhất 6 kí tự",
              },
              validate: (value) =>
                value === password.current || "Mật khẩu không trùng khớp",
            })}
            className="text-black border border-gray-200 py-2 px-4 w-full"
          />
          {errors && errors?.confirmPassword && (
            <span className="mt-1 inline-block text-red-500 text-sm font-normal">
              {errors?.confirmPassword?.message}
            </span>
          )}
        </div>
      </div>
      <div>
        <LoadingButton
          loading={isLoading}
          className="bg-blue-500 text-white px-6 text-sm py-2 w-full"
        >
          Xác nhận
        </LoadingButton>
      </div>
    </form>
  );
};

export default FormChangePassword;
