import EmptyImage from "@/components/CreatePage/EmptyImage";
import PromptBox from "@/components/CreatePage/PromptBox";
import ShowImageBox from "@/components/CreatePage/ShowImageBox";
import Image from "next/image";
import React, { useState } from "react";

import img1 from "@/assets/images/test1.jpg";
import img2 from "@/assets/images/test2.jpg";
import img3 from "@/assets/images/test3.jpg";
import img4 from "@/assets/images/test4.jpg";

const images = [
  { id: 1, src: img1, alt: "이미지1" },
  { id: 2, src: img2, alt: "이미지2" },
  { id: 3, src: img3, alt: "이미지3" },
  { id: 4, src: img4, alt: "이미지4" },
];

const index = () => {
  const [prompt, setPrompt] = useState("");
  // const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log(prompt);

  // const generateImage = async () => {
  //   setLoading(true);
  //   const response = await fetch(
  //     `http://127.0.0.1:8000/generate?prompt=${prompt}+nail+art&num_images=4`
  //   );
  //   const blob = await response.blob();
  //   setImages(URL.createObjectURL(blob));
  //   setLoading(false);
  // };

  return (
    <div className="flex h-full w-full justify-center items-center bg-black text-white">
      <div className="flex flex-col items-center pt-[5rem] pb-5 justify-center w-full h-full flex-1 gap-[1.5rem] pr-[1.5rem] pl-[1.5rem] max-w-[125rem] min-w-0 min-h-0">
        {images.length > 0 ? (
          <div className="w-full h-full max-w-[75rem] min-w-[0] max-h-[full] flex-1 overflow-hidden">
            <div className="grid grid-cols-2 gap-[0.25rem] w-full h-full">
              {images.map((image, index) => (
                <Image
                  key={index}
                  src={image.src}
                  width={500}
                  height={300}
                  alt={image.alt}
                  className="w-full h-full max-w-full rounded-3xl min-w-full object-cover"
                />
              ))}
            </div>
          </div>
        ) : (
          <EmptyImage />
        )}
        <div className="relative max-w-3xl w-full bg-[#2D2D2D] rounded-3xl border border-white/15 p-3 flex items-center gap-3">
          <div
            contentEditable
            className="flex-1 bg-transparent border-none outline-none text-white p-2 min-h-28"
            onInput={(e) => setPrompt(e.currentTarget.textContent || "")}
          ></div>
          <label class="absolute top-10 right-3 inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" class="sr-only peer" />
            <div class="relative w-14 h-7 bg-[#3E3E3E] rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-[#6d6aff]"></div>
          </label>

          <button
            disabled={loading}
            className="absolute flex items-center justify-center bottom-3 right-3 bg-[#6d6aff] text-white px-4 py-2 rounded-4xl hover:bg-[#5a5ae8]"
          >
            {loading ? "생성 중 ... " : "✨ 만들기"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default index;
