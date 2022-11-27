import Link from "next/link";
import React, { FC } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface LogoProps {
  status?: boolean;
}

const Logo: FC<LogoProps> = ({ status }) => {
  return (
    <Link href="/">
      <a className="block">
        <div className="w-[60px] h-[40px] mb-2.5">
          <LazyLoadImage effect="opacity" src="/logo-tiki.png" />
        </div>
        {!status && (
          <div className="w-[129px] h-[18px] md:block hidden">
            <LazyLoadImage effect="opacity" src="/logo-phu.png" />
          </div>
        )}
      </a>
    </Link>
  );
};

export default Logo;
