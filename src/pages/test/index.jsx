import PromptBox from "@/components/CreatePage/PromptBox";
import ShowImageBox from "@/components/CreatePage/ShowImageBox";
import React from "react";

const index = () => {
  return (
    <div className="flex h-full w-full justify-center items-center bg-black text-white">
      <div className="flex items-center pt-[5rem] pb-[5rem] justify-center w-full h-full flex-1 gap-[1.5rem] pr-[1.5rem] pl-[1.5rem] max-w-[125rem] min-w-0 min-h-0">
        <PromptBox />
        <ShowImageBox />
      </div>
    </div>
  );
};

export default index;
