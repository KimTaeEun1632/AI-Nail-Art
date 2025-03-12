import Link from "next/link";
import React from "react";
import arrow from "@/assets/images/arrow.svg";
import Image from "next/image";

const Nav = () => {
  return (
    <header className="flex items-center fixed z-10 text-white top-0 w-full h-20">
      <div className="flex justify-between items-center pl-10 pr-10 w-full h-full ">
        <div className="flex justify-center items-center">
          <Link className="text-2xl" href="/">
            NailArtX
          </Link>
          <button>
            <Image
              className="text-white"
              src={arrow}
              alt="아래방향 화살표"
              width={28}
              height={28}
            />
          </button>
        </div>
        <div>프로필</div>
      </div>
    </header>
  );
};

export default Nav;
