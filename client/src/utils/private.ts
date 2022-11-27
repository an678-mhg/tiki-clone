import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { getUserInfo } from "../services/auth";
import { getPathSignIn, KEY_TOKEN, setTokenServer } from "./contants";

const privateRoute = async (
  context: GetServerSidePropsContext,
  redirect: string
) => {
  const token = context.req.cookies[KEY_TOKEN] as string;
  setTokenServer(token);

  try {
    await getUserInfo();
    return {
      props: {},
    };
  } catch (error) {
    console.log(error);
    return {
      redirect: {
        destination: getPathSignIn(redirect),
        permanent: false,
      },
    };
  }
};

export default privateRoute;
