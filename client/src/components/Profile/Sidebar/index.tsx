import React from "react";
import Info from "./Info";
import MainSidebar from "./MainSidebar";

const Sidebar = () => {
  return (
    <div className="w-[180px]">
      <Info />
      <MainSidebar />
    </div>
  );
};

export default Sidebar;
