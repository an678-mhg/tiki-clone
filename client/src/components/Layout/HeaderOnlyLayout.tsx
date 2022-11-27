import React, { FC } from "react";
import { Layout } from "../../types";
import Header from "../Header";

interface HeaderOnlyLayoutProps extends Layout {}

const HeaderOnlyLayout: FC<HeaderOnlyLayoutProps> = ({ children }) => {
  return (
    <div className="bg-background-gray min-h-screen">
      <Header />

      <div className="container">{children}</div>
    </div>
  );
};

export default HeaderOnlyLayout;
