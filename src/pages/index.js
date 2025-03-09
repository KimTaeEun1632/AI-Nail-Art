import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">🎨 AI 네일아트 생성기</h1>
      <input
        type="text"
        className="p-2 border border-gray-400 rounded w-80"
        placeholder="네일아트 스타일 입력..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        onClick={generateImage}
        className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "생성 중..." : "AI 네일아트 생성"}
      </button>
      {image && (
        <Image
          src={image}
          width={500}
          height={300}
          alt="Generated Nail Art"
          className="mt-4 rounded shadow-lg w-64"
        />
      )}
    </div>
  );
}
