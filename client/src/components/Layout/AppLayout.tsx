import { getCookie } from "cookies-next";
import React, { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { handleSignIn, setUser } from "../../redux/slices/AuthSlice";
import { handleGetAllCart } from "../../redux/slices/CartSlice";
import { Layout } from "../../types";
import { KEY_TOKEN } from "../../utils/contants";

interface AppLayoutProps extends Layout {}

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const token = getCookie(KEY_TOKEN) as string;

  useEffect(() => {
    if (token && !user) {
      dispatch(handleSignIn());
    }
  }, [token, user]);

  useEffect(() => {
    if (!user) return;
    dispatch(handleGetAllCart());
  }, [token, user]);

  return <>{children}</>;
};

export default AppLayout;
