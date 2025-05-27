import Link from "next/link";
import React from "react";

const SideBar = ({ handleCloseSideBar }) => {
  return (
    <Link
      href="/my-library"
      className="text-white"
      onClick={handleCloseSideBar}
    >
      내 라이브러리
    </Link>
  );
};

export default SideBar;
