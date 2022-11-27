import React, { FC } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Layout } from "../../types";
import Logo from "../Header/Logo";

interface AuthLayoutFormProps extends Layout {
  pageName: string;
}

const AuthLayoutForm: FC<AuthLayoutFormProps> = ({ children, pageName }) => {
  return (
    <div className="bg-primary-color">
      <div className="h-[84px] border-b border-gray-200">
        <div className="container flex items-center justify-between h-full">
          <div className="flex items-center">
            <Logo status />

            <p className="text-white text-xl font-normal ml-4">{pageName}</p>
          </div>

          <div>
            <p className="text-white font-normal text-sm">Bạn cần giúp đỡ?</p>
          </div>
        </div>
      </div>

      <div className="h-[calc(100vh-84px)] flex items-center justify-center bg-linear px-4">
        <div className="w-[1000px] max-w-full mx-auto flex items-center justify-between">
          <div className="justify-center flex-col items-center w-[400px] md:flex hidden">
            <div className="w-[300px]">
              <LazyLoadImage effect="opacity" src="/auth-form.png" />
            </div>
            <p className="font-normal text-gray-500 mt-4">
              Mua sắm tại Tiki <span className="block">Ưu đãi mỗi ngày</span>
            </p>
          </div>

          <div className="w-[500px] max-w-full shadow-md rounded-lg">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayoutForm;
