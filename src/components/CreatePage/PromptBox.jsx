import { useState } from "react";

const PromptBox = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    setLoading(true);
    const response = await fetch(
      `http://127.0.0.1:8000/generate?prompt=${prompt}+nail+art`
    );
    const blob = await response.blob();
    setImage(URL.createObjectURL(blob));
    setLoading(false);
  };

  return (
    <div className="relative max-w-3xl w-full bg-[#2D2D2D] rounded-3xl border border-white/15 p-3 flex items-center gap-3">
      <div
        contentEditable
        className="flex-1 bg-transparent border-none outline-none text-white p-2 min-h-28"
        onInput={(e) => setPrompt(e.currentTarget.textContent || "")}
      ></div>
      <button
        onClick={generateImage}
        disabled={loading}
        className="absolute flex items-center justify-center bottom-3 right-3 bg-[#6d6aff] text-white px-4 py-2 rounded-4xl hover:bg-[#5a5ae8]"
      >
        {loading ? "생성 중 ... " : "✨ 만들기"}
        <p>✨ 만들기</p>
      </button>
    </div>
  );
};

export default PromptBox;
