import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React from "react";
import HeaderOnlyLayout from "../../../components/Layout/HeaderOnlyLayout";
import ProfileLayout from "../../../components/Layout/ProfileLayout";
import ChangePassword from "../../../components/Profile/Main/ChangePassword";
import privateRoute from "../../../utils/private";

const ProfileChangePassword = () => {
  return (
    <HeaderOnlyLayout>
      <ProfileLayout>
        <ChangePassword />
      </ProfileLayout>
    </HeaderOnlyLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return privateRoute(context, "/user/profile");
};

export default ProfileChangePassword;
