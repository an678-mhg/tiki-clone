import React from "react";
import Account from "./Account";
import Logo from "./Logo";
import SearchBox from "./SearchBox";

const Header = () => {
  return (
    <div className="bg-primary-color">
      <div className="container pt-4 pb-3 flex justify-between">
        <Logo />
        <SearchBox />
        <Account />
      </div>
    </div>
  );
};

export default Header;
