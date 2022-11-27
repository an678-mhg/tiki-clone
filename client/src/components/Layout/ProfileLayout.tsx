import React, { FC } from "react";
import { Layout } from "../../types";
import Sidebar from "../Profile/Sidebar";

interface ProfileLayoutProps extends Layout {}

const ProfileLayout: FC<ProfileLayoutProps> = ({ children }) => {
  return (
    <div className="flex mt-4 h-full">
      <Sidebar />

      <div className="flex-1 bg-white ml-5 h-[calc(100vh-136.5px)] overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default ProfileLayout;
