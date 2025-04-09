import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import arrow from "@/assets/images/arrow.svg";
import SideBar from "../Common/SideBar";
import { useSession } from "next-auth/react";

const Nav = () => {
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);
  const { status, data: session } = useSession();

  const handOpenSideBar = (event) => {
    event.preventDefault();
    setIsOpenSideBar(!isOpenSideBar);
  };

  const handleCloseSideBar = () => {
    setIsOpenSideBar(false);
  };

  return (
    <>
      <header className="flex items-center fixed z-100 text-white top-0 w-full h-20 bg-black">
        <div className="flex justify-between items-center pl-10 pr-10 w-full h-full">
          <div className="relative flex justify-center items-center">
            <Link className="text-2xl" href="/">
              NailArtX
            </Link>
            <button onClick={handOpenSideBar}>
              <Image
                src={arrow}
                alt="아래방향 화살표"
                width={28}
                height={28}
                className={`text-white transition-transform ${
                  isOpenSideBar ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>
          </div>
          {status === "authenticated" ? (
            <div>
              <span>{session.user.name}</span>{" "}
              <Link href="/api/auth/signout">로그아웃</Link>
            </div>
          ) : (
            <Link href="/auth/signin">로그인</Link>
          )}
        </div>
      </header>

      {/* 사이드바 */}
      <AnimatePresence>
        {isOpenSideBar && (
          <div className="fixed inset-0 z-[90]">
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={handleCloseSideBar}
            />
            <motion.div
              initial={{ y: -50, opacity: 0 }} // 위에서 시작
              animate={{ y: 0, opacity: 1 }} // 아래로 이동하며 나타남
              exit={{ y: -50, opacity: 0 }} // 위로 사라짐
              transition={{ duration: 0.1 }}
              className="absolute top-20 left-10"
            >
              <SideBar />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Nav;
