import React, { useState } from "react";
import { ImageBox, ImageGrid } from "./ImageGrid";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css"; // Swiper 기본 스타일
import "swiper/css/navigation"; // 네비게이션 스타일
import "swiper/css/pagination"; // 페이지네이션 스타일
import { useImages } from "@/lib/ImagesContext";

const EmptyImage = () => {
  const { isCarousel, setIsCarousel } = useImages();
  const [initialSlide, setInitialSlide] = useState(0);

  const boxes = [
    { id: 1, text: "이미지 1" },
    { id: 2, text: "이미지 2" },
    { id: 3, text: "이미지 3" },
    { id: 4, text: "이미지 4" },
  ];

  const handleBoxClick = (index) => {
    setIsCarousel(true);
    setInitialSlide(index);
  };

  return (
    <div className="flex items-center justify-center w-full h-full relative">
      {isCarousel ? (
        <div className="w-full h-full mx-auto">
          <Swiper
            modules={[EffectCoverflow, Pagination]}
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={2}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={{ clickable: true }}
            initialSlide={initialSlide} // 클릭한 슬라이드에서 시작
            className="rounded-3xl"
          >
            {boxes.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="relative w-full flex justify-center rounded-3xl">
                  <ImageBox
                    item={item}
                    isEmpty={true}
                    className="w-full max-w-2xl "
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <ImageGrid items={boxes} onClick={handleBoxClick} isEmpty={true} />
      )}
    </div>
  );
};

export default EmptyImage;
