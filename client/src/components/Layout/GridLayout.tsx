import React, { FC } from "react";
import { Layout } from "../../types";

interface GridLayoutProps extends Layout {
  className?: string;
}

const GridLayout: FC<GridLayoutProps> = ({ children, className }) => {
  return (
    <div
      className={`${
        className && className
      } grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2`}
    >
      {children}
    </div>
  );
};

export default GridLayout;
