import { useState } from "react";

const PromptBox = () => {
  const [prompt, setPrompt] = useState("");

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="이미지 설명을 입력하세요..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button>이미지 생성하기</button>
      </div>
    </div>
  );
};

export default PromptBox;
