import React, { useState } from "react";
import share from "@/assets/images/share.svg";
import bookmark from "@/assets/images/bookmark.svg";
import bookmarked from "@/assets/images/bookmarked.svg";
import down from "@/assets/images/down.svg";
import duplicate from "@/assets/images/duplicate.svg";
import dots from "@/assets/images/dots.svg";
import deleteImage from "@/assets/images/delete.svg";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useHoverAction } from "@/lib/HoverActionContext";

const HoverAction = ({ image }) => {
  const { handleBookmark, copyToClipboard, downloadImage, deleteImage } =
    useHoverAction();
  const [openMore, setOpenMore] = useState(false);
  const imageUrl = image?.file_path;

  // const handleButtonClick = (action, event) => {
  //   event.stopPropagation();
  //   console.log(`${action} button clicked`);
  // };

  const handleOpenMore = () => {
    setOpenMore(!openMore);
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      <div
        className="absolute bottom-2 right-2 translate-y-[52px] opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition duration-300 pointer-events-auto z-20"
        onMouseEnter={() => console.log("Buttons container hovered")}
      >
        <div className="flex items-center gap-2 bg-black/50 px-2 py-1 rounded">
          <div className="relative group/button">
            <button
              className="p-1 hover:bg-white/10 rounded cursor-pointer"
              onClick={() => handleBookmark(image.id)}
            >
              {image?.is_bookmarked ? (
                <Image
                  src={bookmarked}
                  alt="이미지 북마크"
                  width={20}
                  height={20}
                />
              ) : (
                <Image
                  src={bookmark}
                  alt="이미지 북마크"
                  width={20}
                  height={20}
                />
              )}
            </button>
            <span className="absolute bottom-full left-1/2 -translate-y-2 -translate-x-1/2 mb-1 whitespace-nowrap text-xs text-black bg-white px-4 py-3 rounded-2xl opacity-0 group-hover/button:opacity-100 transition-opacity duration-300 pointer-events-none z-30 before:content-[''] before:absolute before:-bottom-[15px] before:left-1/2 before:-translate-x-1/2 before:border-8 before:border-transparent before:border-t-white">
              북마크
            </span>
          </div>
          <div className="relative group/button">
            <button
              className="p-1 hover:bg-white/10 rounded cursor-pointer"
              onClick={() => copyToClipboard(imageUrl)}
            >
              <Image
                src={duplicate}
                alt="이미지 복사하기"
                width={20}
                height={20}
              />
            </button>
            <span className="absolute bottom-full left-1/2 -translate-y-2 -translate-x-1/2 mb-1 whitespace-nowrap text-xs text-black bg-white px-4 py-3 rounded-2xl opacity-0 group-hover/button:opacity-100 transition-opacity duration-300 pointer-events-none z-30 before:content-[''] before:absolute before:-bottom-[15px] before:left-1/2 before:-translate-x-1/2 before:border-8 before:border-transparent before:border-t-white">
              복사
            </span>
          </div>
          <div className="relative group/button">
            <button
              className="p-1 hover:bg-white/10 rounded cursor-pointer"
              onClick={() => downloadImage(imageUrl)}
            >
              <Image src={down} alt="이미지 다운로드" width={20} height={20} />
            </button>
            <span className="absolute bottom-full left-1/2 -translate-y-2 -translate-x-1/2 mb-1 whitespace-nowrap text-xs text-black bg-white px-4 py-3 rounded-2xl opacity-0 group-hover/button:opacity-100 transition-opacity duration-300 pointer-events-none z-30 before:content-[''] before:absolute before:-bottom-[15px] before:left-1/2 before:-translate-x-1/2 before:border-8 before:border-transparent before:border-t-white">
              다운로드
            </span>
          </div>
          <div className="relative group/button">
            <button
              className="p-1 hover:bg-white/10 rounded cursor-pointer"
              onClick={handleOpenMore}
            >
              <Image src={dots} alt="더 보기" width={20} height={20} />
            </button>
            <span className="absolute bottom-full left-1/2 -translate-y-2 -translate-x-1/2 mb-1 whitespace-nowrap text-xs text-black bg-white px-4 py-3 rounded-2xl opacity-0 group-hover/button:opacity-100 transition-opacity duration-300 pointer-events-none z-30 before:content-[''] before:absolute before:-bottom-[15px] before:left-1/2 before:-translate-x-1/2 before:border-8 before:border-transparent before:border-t-white">
              더보기
            </span>
            {openMore && (
              <div>
                <button onClick={() => deleteImage(image.id)}>
                  <Image
                    src={deleteImage}
                    alt="이미지 삭제"
                    width={20}
                    height={20}
                  />
                  삭제
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoverAction;
