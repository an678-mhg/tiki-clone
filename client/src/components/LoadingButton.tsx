import React, { FC } from "react";
import { CircularProgress } from "react-cssfx-loading";
import { Layout } from "../types";

interface LoadingButtonProps extends Layout {
  loading: boolean;
  className: string;
}

const LoadingButton: FC<LoadingButtonProps> = ({
  loading,
  className,
  children,
}) => {
  return (
    <button
      disabled={loading}
      className={`${className} ${loading && "opacity-50"}`}
    >
      {loading ? (
        <span className="flex items-center w-full justify-center">
          <CircularProgress
            className="mr-2"
            color="#fff"
            width={20}
            height={20}
          />{" "}
          Vui lòng đợi
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default LoadingButton;
