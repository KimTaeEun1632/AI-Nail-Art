import MyLibrarySkeleton from "@/components/MyLibraryPage/MyLibrarySkeleton";
import React from "react";

const index = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-black text-white py-24 px-4">
      <MyLibrarySkeleton />
    </div>
  );
};

export default index;
