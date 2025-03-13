import EmptyImage from "@/components/CreatePage/EmptyImage";
import Image from "next/image";
import React, { useState } from "react";

const CreatePage = () => {
  const [prompt, setPrompt] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateImage = async () => {
    if (!prompt.trim()) {
      setError("프롬프트를 입력해주세요.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/generate?prompt=${encodeURIComponent(
          prompt + " nail art"
        )}&num_images=4`
      );

      if (!response.ok) {
        throw new Error("이미지 생성에 실패했습니다.");
      }

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
    <div className="flex min-h-screen w-full items-center justify-center bg-black text-white">
      <div className="flex w-full max-w-7xl flex-col items-center gap-6 p-6">
        {/* 이미지 표시 영역 */}
        {images.length > 0 ? (
          <div className="grid w-full max-w-5xl grid-cols-2 gap-1">
            {images.map((image) => (
              <div key={image.id} className="relative aspect-[5/3] w-full">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="rounded-3xl object-cover"
                  priority={image.id === 1}
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8//8/AwAI/AL+XlDx1gAAAABJRU5ErkJggg=="
                />
              </div>
            ))}
          </div>
        ) : (
          <EmptyImage />
        )}

        {/* 프롬프트 입력 및 버튼 영역 */}
        <div className="relative w-full max-w-3xl rounded-3xl border border-white/15 bg-[#2D2D2D] p-4">
          <div
            contentEditable
            className="min-h-28 flex-1 border-none bg-transparent p-2 text-white outline-none"
            onInput={(e) => setPrompt(e.currentTarget.textContent || "")}
            suppressContentEditableWarning
          />
          {error && <p className="mt-2 text-sm text-red-400">{error}</p>}

          {/* 생성 버튼 */}
          <button
            disabled={loading}
            onClick={generateImage}
            className="absolute bottom-3 right-3 flex items-center justify-center rounded-full bg-[#6d6aff] px-4 py-2 text-white hover:bg-[#5a5ae8] disabled:opacity-50"
          >
            {loading ? "생성 중..." : "✨ 만들기"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
