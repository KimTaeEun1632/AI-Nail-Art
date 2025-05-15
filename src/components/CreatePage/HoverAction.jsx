import React, { useState } from "react";
import bookmark from "@/assets/images/bookmark.svg";
import bookmarked from "@/assets/images/bookmarked.svg";
import down from "@/assets/images/down.svg";
import duplicate from "@/assets/images/duplicate.svg";
import deleteButton from "@/assets/images/delete.svg";
import Image from "next/image";
import { useHoverAction } from "@/lib/HoverActionContext";

const HoverAction = ({ image }) => {
  const { handleBookmark, copyToClipboard, downloadImage, deleteImage } =
    useHoverAction();
  const imageUrl = image?.file_path;

  return (
    <div className="absolute inset-0 pointer-events-none z-50">
      <div
        className="absolute flex items-center justify-center w-full bottom-2 translate-y-[52px] opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition duration-300 pointer-events-auto z-60"
        onMouseEnter={() => console.log("Buttons container hovered")}
      >
        <div className="flex items-center gap-2 bg-gray-800 px-2 py-1 rounded">
          <div className="relative group/button">
            <button
              className="p-1 hover:bg-white/10 rounded cursor-pointer"
              onClick={(event) => {
                event.stopPropagation();
                handleBookmark(image.id);
              }}
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
            <span className="absolute bottom-full left-1/2 -translate-y-2 -translate-x-1/2 mb-1 whitespace-nowrap text-xs text-black bg-white px-4 py-3 rounded-2xl opacity-0 group-hover/button:opacity-100 transition-opacity duration-300 pointer-events-none z-70 before:content-[''] before:absolute before:-bottom-[15px] before:left-1/2 before:-translate-x-1/2 before:border-8 before:border-transparent before:border-t-white">
              북마크
            </span>
          </div>
          <div className="relative group/button">
            <button
              className="p-1 hover:bg-white/10 rounded cursor-pointer"
              onClick={(event) => {
                event.stopPropagation();
                copyToClipboard(imageUrl);
              }}
            >
              <Image
                src={duplicate}
                alt="이미지 복사하기"
                width={20}
                height={20}
              />
            </button>
            <span className="absolute bottom-full left-1/2 -translate-y-2 -translate-x-1/2 mb-1 whitespace-nowrap text-xs text-black bg-white px-4 py-3 rounded-2xl opacity-0 group-hover/button:opacity-100 transition-opacity duration-300 pointer-events-none z-70 before:content-[''] before:absolute before:-bottom-[15px] before:left-1/2 before:-translate-x-1/2 before:border-8 before:border-transparent before:border-t-white">
              복사
            </span>
          </div>
          <div className="relative group/button">
            <button
              className="p-1 hover:bg-white/10 rounded cursor-pointer"
              onClick={(event) => {
                event.stopPropagation();
                downloadImage(imageUrl);
              }}
            >
              <Image src={down} alt="이미지 다운로드" width={20} height={20} />
            </button>
            <span className="absolute bottom-full left-1/2 -translate-y-2 -translate-x-1/2 mb-1 whitespace-nowrap text-xs text-black bg-white px-4 py-3 rounded-2xl opacity-0 group-hover/button:opacity-100 transition-opacity duration-300 pointer-events-none z-70 before:content-[''] before:absolute before:-bottom-[15px] before:left-1/2 before:-translate-x-1/2 before:border-8 before:border-transparent before:border-t-white">
              다운로드
            </span>
          </div>
          <div className="relative group/button">
            <button
              className="p-1 hover:bg-white/10 rounded cursor-pointer"
              onClick={(event) => {
                event.stopPropagation();
                deleteImage(image.id);
              }}
            >
              <Image
                src={deleteButton}
                alt="이미지 삭제"
                width={20}
                height={20}
              />
            </button>
            <span className="absolute bottom-full left-1/2 -translate-y-2 -translate-x-1/2 mb-1 whitespace-nowrap text-xs text-black bg-white px-4 py-3 rounded-2xl opacity-0 group-hover/button:opacity-100 transition-opacity duration-300 pointer-events-none z-70 before:content-[''] before:absolute before:-bottom-[15px] before:left-1/2 before:-translate-x-1/2 before:border-8 before:border-transparent before:border-t-white">
              삭제
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoverAction;
