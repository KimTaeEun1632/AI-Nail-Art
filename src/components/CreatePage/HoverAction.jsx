import React from "react";
import share from "@/assets/images/share.svg";
import bookmark from "@/assets/images/bookmark.svg";
import down from "@/assets/images/down.svg";
import duplicate from "@/assets/images/duplicate.svg";
import Image from "next/image";

const HoverAction = () => {
  const handleButtonClick = (event) => {
    event.stopPropagation(); // Swiper 및 ImageBox 이벤트 차단
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-100">
      <div className="absolute top-2 right-2 -translate-y-[52px] opacity-0 group-hover:opacity-100 group-hover:-translate-y-0 transition duration-300">
        <h1 className="text-sm text-white bg-black/50 px-2 py-1 rounded">
          좋아요 싫어요 버튼
        </h1>
      </div>
      <div className="absolute bottom-2 right-2 translate-y-[52px] opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition duration-300 pointer-events-auto z-20">
        <div className="flex items-center gap-2 bg-black/50 px-2 py-1 rounded">
          <button
            className="p-1 hover:bg-white/10 rounded"
            onClick={(e) => handleButtonClick("Bookmark", e)}
          >
            <Image src={bookmark} alt="이미지 북마크" width={20} height={20} />
          </button>
          <button
            className="p-1 hover:bg-white/10 rounded"
            onClick={(e) => handleButtonClick("Duplicate", e)}
          >
            <Image
              src={duplicate}
              alt="이미지 복사하기"
              width={20}
              height={20}
            />
          </button>
          <button
            className="p-1 hover:bg-white/10 rounded"
            onClick={(e) => handleButtonClick("Download", e)}
          >
            <Image src={down} alt="이미지 다운로드" width={20} height={20} />
          </button>
          <button
            className="p-1 hover:bg-white/10 rounded"
            onClick={(e) => handleButtonClick("Share", e)}
          >
            <Image src={share} alt="이미지 공유하기" width={20} height={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HoverAction;
