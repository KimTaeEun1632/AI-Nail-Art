import PromptBox from "@/components/CreatePage/PromptBox";
import ShowImageBox from "@/components/CreatePage/ShowImageBox";
import React from "react";

const index = () => {
  return (
    <div className="flex justify-center h-full">
      <div>
        패딩 탑 적용 컨테이너
        <div className="flex items-center justify-center w-full flex-auto gap-[1.5rem]">
          <PromptBox />
          <ShowImageBox />
        </div>
      </div>
    </div>
  );
};

export default index;
