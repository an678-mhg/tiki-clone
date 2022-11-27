import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "../../services/auth";
import { AxiosError } from "axios";
import { AuthResponse } from "../../types";
import { KEY_TOKEN } from "../../utils/contants";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { CircularProgress } from "react-cssfx-loading";
import LoadingButton from "../LoadingButton";

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [errorMess, setErrorMess] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: { email: string; password: string }) => {
    const { email, password } = data;
    setLoading(true);
    setErrorMess(null);
    try {
      const res = await signIn(email, password);
      setCookie(KEY_TOKEN, res.token);
      router.push((router.query?.redirect as string) || "/");
    } catch (error) {
      const message = (error as AxiosError<AuthResponse>).response?.data
        .message as string;
      setErrorMess(message);
    }
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-lg">
      <form onSubmit={handleSubmit(onSubmit)} className="w-fullm p-8">
        <div>
          <h1 className="text-2xl font-medium">Đăng nhập bằng email</h1>
          <p className="text-sm font-normal mt-1">
            Nhập email và mật khẩu tài khoản Tiki
          </p>
          {errorMess && (
            <p className="text-sm font-normal mt-1 text-red-500">{errorMess}</p>
          )}
        </div>

        <div className="mt-6">
          <div className="w-full mb-5">
            <input
              {...register("email", {
                required: { value: true, message: "Trường này là bắt buộc" },
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Email sai định dạng",
                },
              })}
              className="w-full border-b border-gray-200 py-2"
              placeholder="abc@gmail.com"
            />
            {errors && errors?.email && (
              <span className="mt-1 text-red-500 text-sm font-normal">
                {errors?.email?.message}
              </span>
            )}
          </div>
          <div className="w-full mb-4">
            <div className="relative">
              <input
                {...register("password", {
                  required: { value: true, message: "Trường này là bắt buộc" },
                  minLength: {
                    value: 6,
                    message: "Mật khẩu có ít nhất 6 kí tự",
                  },
                })}
                className="w-full border-b border-gray-200 py-2"
                placeholder="Mật khẩu"
                type={showPassword ? "text" : "password"}
              />
              <p
                onClick={() => setShowPassword((prev) => !prev)}
                className="text-blue-500 hover:underline cursor-pointer text-sm right-0 absolute top-[50%] translate-y-[-50%]"
              >
                {showPassword ? "Ẩn" : "Hiện"}
              </p>
            </div>
            {errors && errors?.password && (
              <span className="mt-1 text-red-500 text-sm font-normal">
                {errors?.password?.message}
              </span>
            )}
          </div>
          <div className="w-full mt-8">
            <LoadingButton
              loading={loading}
              className="bg-bg-button-red py-2 px-4 rounded-[4px] text-white font-normal w-full hover:bg-red-400 transition-colors"
            >
              Đăng nhập
            </LoadingButton>
          </div>

          <div className="mt-5">
            <p className="text-sm text-gray-500">
              Chưa có tài khoản?{" "}
              <Link href="/auth/sign-up">
                <a className="text-blue-500 hover:underline">Đăng ký</a>
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
