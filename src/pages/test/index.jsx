import PromptInput from "@/components/CreatePage/PromptInput";
import ShowImageBox from "@/components/CreatePage/ShowImageBox";
import { ImagesProvider } from "@/lib/ImagesContext";
import React from "react";

const CreatePage = () => {
  return (
    <ImagesProvider>
      <div className="relative flex min-h-screen w-full items-center justify-center bg-black text-white">
        <div className="flex w-full max-w-7xl flex-col justify-between items-center gap-6 p-6">
          <ShowImageBox />
          <PromptInput />
        </div>
      </div>
    </ImagesProvider>
  );
};

export default CreatePage;
