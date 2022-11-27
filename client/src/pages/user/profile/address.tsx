import React from "react";
import HeaderOnlyLayout from "../../../components/Layout/HeaderOnlyLayout";
import ProfileLayout from "../../../components/Layout/ProfileLayout";
import Address from "../../../components/Profile/Main/Address";

const ProfileAddress = () => {
  return (
    <HeaderOnlyLayout>
      <ProfileLayout>
        <Address />
      </ProfileLayout>
    </HeaderOnlyLayout>
  );
};

export default ProfileAddress;
