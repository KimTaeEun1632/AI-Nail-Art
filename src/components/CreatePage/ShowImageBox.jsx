// components/ShowImageBox.jsx
import React, { useState } from "react";
import { useImages } from "@/lib/ImagesContext";
import { ImageBox, ImageGrid } from "./ImageGrid";
import EmptyImage from "./EmptyImage";

const ShowImageBox = () => {
  const { images } = useImages();
  const [isCarousel, setIsCarousel] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleBoxClick = (index) => {
    setIsCarousel(true);
    setCurrentIndex(index);
  };

  const handleSideBoxClick = (index) => {
    setCurrentIndex(index);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const prevIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
  const nextIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;

  return (
    <div className="w-full max-w-5xl mx-auto relative">
      {images.length > 0 ? (
        isCarousel ? (
          <div className="relative">
            <div className="relative flex justify-center items-center">
              {/* 왼쪽 박스 */}
              <div
                className="absolute left-0 w-1/3 opacity-50 hover:opacity-75 cursor-pointer transition-all duration-300 transform scale-95"
                onClick={() => handleSideBoxClick(prevIndex)}
              >
                <ImageBox item={images[prevIndex]} isEmpty={false} />
              </div>

              {/* 중앙 박스 */}
              <div className="w-2/3 z-20 transition-all duration-500 transform scale-100 hover:scale-105">
                <ImageBox
                  item={images[currentIndex]}
                  isEmpty={false}
                  onClick={() => setIsCarousel(false)}
                  className="text-2xl cursor-pointer"
                ></ImageBox>
              </div>

              {/* 오른쪽 박스 */}
              <div
                className="absolute right-0 w-1/3 opacity-50 hover:opacity-75 cursor-pointer transition-all duration-300 transform scale-95"
                onClick={() => handleSideBoxClick(nextIndex)}
              >
                <ImageBox item={images[nextIndex]} isEmpty={false} />
              </div>
            </div>

            {/* 좌우 버튼과 인디케이터 */}
            <div className="flex justify-center items-center mt-4 space-x-4">
              <button
                onClick={handlePrev}
                className="text-white text-xl hover:text-gray-300 transition-transform transform hover:scale-110"
                disabled={images.length <= 1}
              >
                {"<"}
              </button>
              <div className="flex space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                      currentIndex === index ? "bg-white" : "bg-gray-400"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={handleNext}
                className="text-white text-xl hover:text-gray-300 transition-transform transform hover:scale-110"
                disabled={images.length <= 1}
              >
                {">"}
              </button>
            </div>
          </div>
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
