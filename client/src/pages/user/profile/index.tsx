import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React from "react";
import HeaderOnlyLayout from "../../../components/Layout/HeaderOnlyLayout";
import ProfileLayout from "../../../components/Layout/ProfileLayout";
import Information from "../../../components/Profile/Main/Information";
import privateRoute from "../../../utils/private";

const Profile = () => {
  return (
    <HeaderOnlyLayout>
      <ProfileLayout>
        <Information />
      </ProfileLayout>
    </HeaderOnlyLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return privateRoute(context, "/user/profile");
};

export default Profile;
