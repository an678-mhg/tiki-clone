import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import React from "react";
import SignUpForm from "../../components/Auth/SignUpForm";
import AuthLayoutForm from "../../components/Layout/AuthLayoutForm";
import { getUserInfo } from "../../services/auth";
import { KEY_TOKEN, setTokenServer } from "../../utils/contants";

const SignUp: NextPage = () => {
  return (
    <AuthLayoutForm pageName="Đăng ký">
      <SignUpForm />
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

export default SignUp;
