import { AxiosError } from "axios";
import { setCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { CircularProgress } from "react-cssfx-loading";
import { useForm } from "react-hook-form";
import { signUp } from "../../services/auth";
import { AuthResponse } from "../../types";
import { genarateAvatar, KEY_TOKEN } from "../../utils/contants";
import LoadingButton from "../LoadingButton";

const SignUpForm = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      username: "",
      comfirmPassword: "",
    },
  });

  const password = useRef({});
  password.current = watch("password", "");

  const [loading, setLoading] = useState(false);
  const [errorMess, setErrorMess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const onSubmit = async (values: {
    email: string;
    username: string;
    password: string;
    comfirmPassword: string;
  }) => {
    const { email, password, username, comfirmPassword } = values;

    if (password !== comfirmPassword) return;

    setErrorMess("");
    setLoading(true);
    try {
      const response = await signUp(
        email,
        username,
        password,
        genarateAvatar(username)
      );
      if (response.success) {
        setCookie(KEY_TOKEN, response.token);
        router.push((router.query?.redirect as string) || "/");
      }
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
          <h1 className="text-2xl font-medium">Đăng ký bằng email</h1>
          <p className="text-sm font-normal mt-1">
            Nhập email, mật khẩu và username
          </p>
          {errorMess && (
            <p className="text-sm font-normal mt-1 text-red-500">{errorMess}</p>
          )}
        </div>

        <div className="mt-6">
          <div className="w-full mb-5">
            <input
              {...register("username", {
                required: { value: true, message: "Trường này là bắt buộc" },
                maxLength: { value: 20, message: "Tên không dài quá 20 kí tự" },
              })}
              className="w-full border-b border-gray-200 py-2"
              placeholder="Username"
            />
            {errors && errors?.username && (
              <span className="mt-1 text-red-500 text-sm font-normal">
                {errors?.username?.message}
              </span>
            )}
          </div>
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
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: { value: true, message: "Trường này là bắt buộc" },
                  minLength: {
                    value: 6,
                    message: "Mật khẩu có ít nhất 6 kí tự",
                  },
                })}
                className="w-full border-b border-gray-200 py-2"
                placeholder="Mật khẩu"
              />
              <p
                onClick={() => setShowPassword((prev) => !prev)}
                className="text-blue-500 text-sm right-0 absolute top-[50%] translate-y-[-50%] cursor-pointer"
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
          <div className="w-full mb-4">
            <input
              type={showPassword ? "text" : "password"}
              {...register("comfirmPassword", {
                required: { value: true, message: "Trường này là bắt buộc" },
                minLength: {
                  value: 6,
                  message: "Mật khẩu có ít nhất 6 kí tự",
                },
                validate: (value) =>
                  value === password.current || "Mật khẩu không trùng khớp",
              })}
              className="w-full border-b border-gray-200 py-2"
              placeholder="Nhập lại mật khẩu"
            />
            {errors && errors?.comfirmPassword && (
              <span className="mt-1 text-red-500 text-sm font-normal">
                {errors?.comfirmPassword?.message}
              </span>
            )}
          </div>
          <div className="w-full mt-8">
            <LoadingButton
              loading={loading}
              className="bg-bg-button-red py-2 px-4 rounded-[4px] text-white font-normal w-full hover:bg-red-400 transition-colors"
            >
              Đăng ký
            </LoadingButton>
          </div>

          <div className="mt-5">
            <p className="text-sm text-gray-500">
              Đã có tài khoản?{" "}
              <Link href="/auth/sign-in">
                <a className="text-blue-500 hover:underline">Đăng nhập</a>
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
