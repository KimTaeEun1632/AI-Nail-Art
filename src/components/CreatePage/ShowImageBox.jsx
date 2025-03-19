import React, { useState } from "react";
import { useImages } from "@/lib/ImagesContext";
import { ImageGrid } from "./ImageGrid";
import EmptyImage from "./EmptyImage";
import img1 from "@/assets/images/test1.jpg";
import img2 from "@/assets/images/test2.jpg";
import img3 from "@/assets/images/test3.jpg";
import img4 from "@/assets/images/test4.jpg";
import SwiperCarousel from "./SwiperCarousel";

// const images = [
//   { src: img1, alt: "img1" },
//   { src: img2, alt: "img2" },
//   { src: img3, alt: "img3" },
//   { src: img4, alt: "img4" },
// ];

const ShowImageBox = () => {
  const { images, isCarousel, setIsCarousel } = useImages();
  const [initialSlide, setInitialSlide] = useState(0);

  const handleBoxClick = (index) => {
    setIsCarousel(true);
    setInitialSlide(index);
  };

  return (
    <div className="flex items-center justify-center w-full h-full relative">
      {images.length > 0 ? (
        isCarousel ? (
          <SwiperCarousel images={images} initialSlide={initialSlide} />
        ) : (
          <ImageGrid items={images} onClick={handleBoxClick} isEmpty={false} />
        )
      ) : (
        <EmptyImage />
      )}
    </div>
  );
};

export default ShowImageBox;
