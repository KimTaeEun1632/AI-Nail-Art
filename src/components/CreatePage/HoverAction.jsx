import React from "react";
import share from "@/assets/images/share.svg";
import bookmark from "@/assets/images/bookmark.svg";
import down from "@/assets/images/down.svg";
import duplicate from "@/assets/images/duplicate.svg";
import Image from "next/image";

const HoverAction = () => {
  const handleButtonClick = (action, event) => {
    event.stopPropagation(); // Swiper 및 ImageBox 이벤트 차단
    console.log(`${action} button clicked`);
  };

  const handleBookmark = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/images/bookmark/${image.id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // 세션에서 가져오거나 상태 관리 사용
          },
        }
      );
      if (!response.ok) {
        throw new Error("북마크 업데이트 실패");
      }
      const data = await response.json();
      setIsBookmarked(data.is_bookmarked);
      onBookmarkToggle(image.id, data.is_bookmarked); // 부모 컴포넌트에 상태 업데이트 알림
    } catch (err) {
      console.error("북마크 에러:", err);
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      <div className="absolute top-2 right-2 -translate-y-[52px] opacity-0 group-hover:opacity-100 group-hover:-translate-y-0 transition duration-300 z-10">
        <h1 className="text-sm text-white bg-black/50 px-2 py-1 rounded">
          좋아요 싫어요 버튼
        </h1>
      </div>
      <div
        className="absolute bottom-2 right-2 translate-y-[52px] opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition duration-300 pointer-events-auto z-20"
        onMouseEnter={() => console.log("Buttons container hovered")}
      >
        <div className="flex items-center gap-2 bg-black/50 px-2 py-1 rounded">
          <div className="relative group/button">
            <button
              className="p-1 hover:bg-white/10 rounded cursor-pointer"
              onClick={handleBookmark}
            >
              <Image
                src={bookmark}
                alt="이미지 북마크"
                width={20}
                height={20}
              />
            </button>
            <span className="absolute bottom-full left-1/2 -translate-y-2 -translate-x-1/2 mb-1 whitespace-nowrap text-xs text-black bg-white px-4 py-3 rounded-2xl opacity-0 group-hover/button:opacity-100 transition-opacity duration-300 pointer-events-none z-30 before:content-[''] before:absolute before:-bottom-[15px] before:left-1/2 before:-translate-x-1/2 before:border-8 before:border-transparent before:border-t-white">
              북마크
            </span>
          </div>
          <div className="relative group/button">
            <button
              className="p-1 hover:bg-white/10 rounded cursor-pointer"
              onClick={(e) => handleButtonClick("Duplicate", e)}
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
              onClick={(e) => handleButtonClick("Download", e)}
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
              onClick={(e) => handleButtonClick("Share", e)}
            >
              <Image src={share} alt="이미지 공유하기" width={20} height={20} />
            </button>
            <span className="absolute bottom-full left-1/2 -translate-y-2 -translate-x-1/2 mb-1 whitespace-nowrap text-xs text-black bg-white px-4 py-3 rounded-2xl opacity-0 group-hover/button:opacity-100 transition-opacity duration-300 pointer-events-none z-30 before:content-[''] before:absolute before:-bottom-[15px] before:left-1/2 before:-translate-x-1/2 before:border-8 before:border-transparent before:border-t-white">
              공유
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoverAction;
