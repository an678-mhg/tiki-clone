import React, { FC } from "react";
import { Layout } from "../../../types";

interface SidebarItemProps extends Layout {
  title: string;
}

const SidebarItem: FC<SidebarItemProps> = ({ title, children }) => {
  return (
    <div className="p-4 border-b border-gray-100">
      <h1 className="font-medium text-[14px]">{title}</h1>
      {children}
    </div>
  );
};

export default SidebarItem;
