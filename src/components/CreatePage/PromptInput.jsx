import { useState } from "react";
import { useImages } from "@/lib/ImagesContext";
import Toggle from "../Common/Toggle";
import { useSession } from "next-auth/react";

const PromptInput = ({ generateMutation, loading }) => {
  const { error, setError } = useImages();
  const [prompt, setPrompt] = useState("");
  const { data: session } = useSession();
  console.log("세선", session);

  const handleGenerateImage = () => {
    if (!prompt.trim()) {
      setError("프롬프트를 입력해주세요.");
      return;
    }
    generateMutation.mutate(prompt);
  };

  return (
    <div className="relative w-full max-w-3xl rounded-3xl border border-white/15 bg-[#2D2D2D] p-4">
      <div
        contentEditable
        className="min-h-28 flex-1 border-none bg-transparent p-2 text-white outline-none"
        onInput={(e) => setPrompt(e.currentTarget.textContent || "")}
        suppressContentEditableWarning
      />
      {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
      <div className="absolute top-10 right-3">
        <Toggle />
      </div>
      <button
        disabled={loading}
        onClick={handleGenerateImage}
        className="absolute bottom-3 right-3 rounded-full bg-[#6d6aff] px-4 py-2 text-white hover:bg-[#5a5ae8] disabled:opacity-50"
      >
        {loading ? "생성 중..." : "✨ 만들기"}
      </button>
    </div>
  );
};

export default PromptInput;
