import { useState } from "react";

const PromptBox = () => {
  const [prompt, setPrompt] = useState("");

  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-[0.5rem] h-full max-w-[32rem] min-w-[32rem] max-h-[64rem]">
      <div className="flex justify-between p-2 rounded-[32px] border border-white/15 bg-[rgba(27,27,27,0.75)] w-full">
        헤더
        <button>전환</button>
      </div>
      <div className="flex flex-col rounded-[32px] border border-white/15 bg-[rgba(27,27,27,0.75)] w-full flex-[2.5_1_0%]">
        <input
          className="h-full"
          type="text"
          placeholder="이미지 설명을 입력하세요..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button>만들기</button>
      </div>
    </div>
  );
};

export default PromptBox;
