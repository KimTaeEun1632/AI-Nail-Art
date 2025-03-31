import React from "react";
import Nav from "@/components/Nav/Nav";

const MainLayout = ({ children }) => {
  return (
    <>
      <Nav />
      <main>{children}</main>
    </>
  );
};
export default MainLayout;
