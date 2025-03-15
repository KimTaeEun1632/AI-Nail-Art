import { useState } from "react";
import { useImages } from "@/lib/ImagesContext";

const PromptInput = () => {
  const { loading, error, setImages, setLoading, setError } = useImages();
  const [prompt, setPrompt] = useState("");

  const generateImage = async () => {
    if (!prompt.trim()) {
      setError("프롬프트를 입력해주세요.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_BASE_URL
        }/generate?prompt=${encodeURIComponent(
          prompt + " nail art"
        )}&num_images=4`
      );
      if (!response.ok) throw new Error("이미지 생성에 실패했습니다.");
      const data = await response.json();
      const generatedImages = data.images.map((img) => ({
        id: img.id,
        src: `data:image/png;base64,${img.base64}`,
        alt: `Generated nail art image ${img.id}`,
      }));
      setImages(generatedImages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
      <button
        disabled={loading}
        onClick={generateImage}
        className="absolute bottom-3 right-3 rounded-full bg-[#6d6aff] px-4 py-2 text-white hover:bg-[#5a5ae8] disabled:opacity-50"
      >
        {loading ? "생성 중..." : "✨ 만들기"}
      </button>
    </div>
  );
};

export default PromptInput;
