import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from "next";
import React from "react";
import SignInForm from "../../components/Auth/SignInForm";
import AuthLayoutForm from "../../components/Layout/AuthLayoutForm";
import { KEY_TOKEN, setTokenServer } from "../../utils/contants";
import { getUserInfo } from "../../services/auth";

const SignIn: NextPage = () => {
  return (
    <AuthLayoutForm pageName="Đăng nhập">
      <SignInForm />
    </AuthLayoutForm>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const redirect = (context.query?.redirect as string) || "/";
  const token = context.req.cookies[KEY_TOKEN] as string;

  setTokenServer(token);

  try {
    await getUserInfo();
    return {
      redirect: {
        destination: redirect,
        permanent: false,
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};

export default SignIn;
