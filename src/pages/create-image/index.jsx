import LiveBackground from "@/components/Common/LiveBackground";
import PromptInput from "@/components/CreatePage/PromptInput";
import ShowImageBox from "@/components/CreatePage/ShowImageBox";
import { useImages } from "@/lib/ImagesContext";

import React from "react";

const CreatePage = () => {
  const { loading } = useImages();
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-black text-white">
      <div className="flex w-full h-full flex-col justify-between items-center gap-5 py-6 mt-20">
        {loading && <LiveBackground />}
        <ShowImageBox />
        <PromptInput />
      </div>
    </div>
  );
};

export default CreatePage;
