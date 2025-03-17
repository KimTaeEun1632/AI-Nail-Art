import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css"; // Swiper 기본 스타일
import "swiper/css/navigation"; // 네비게이션 스타일
import "swiper/css/pagination"; // 페이지네이션 스타일
import { ImageBox } from "./ImageGrid";

const SwiperCarousel = ({ images, initialSlide }) => {
  return (
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
        {images.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="relative w-full flex justify-center rounded-3xl">
              <ImageBox
                item={item}
                isEmpty={false} // 클릭 시 그리드로 돌아감
                className="w-full max-w-2xl "
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperCarousel;
