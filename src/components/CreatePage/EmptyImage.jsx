// components/CreatePage/EmptyImage.jsx
import React, { useState } from "react";
import { ImageBox, ImageGrid } from "./ImageGrid";

const EmptyImage = () => {
  const [isCarousel, setIsCarousel] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const boxes = [
    { id: 1, text: "이미지 1" },
    { id: 2, text: "이미지 2" },
    { id: 3, text: "이미지 3" },
    { id: 4, text: "이미지 4" },
  ];

  const handleBoxClick = (index) => {
    setIsCarousel(true);
    setCurrentIndex(index);
  };

  const handleSideBoxClick = (index) => {
    setCurrentIndex(index);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : boxes.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < boxes.length - 1 ? prev + 1 : 0));
  };

  const prevIndex = currentIndex > 0 ? currentIndex - 1 : boxes.length - 1;
  const nextIndex = currentIndex < boxes.length - 1 ? currentIndex + 1 : 0;

  return (
    <div className="w-full max-w-5xl mx-auto relative">
      {isCarousel ? (
        <div className="relative">
          <div className="relative flex justify-center items-center">
            {/* 왼쪽 박스 */}
            <div
              className="absolute left-0 w-1/3 opacity-50 hover:opacity-75 cursor-pointer transition-all duration-300 transform scale-95"
              onClick={() => handleSideBoxClick(prevIndex)}
            >
              <ImageBox
                item={boxes[prevIndex]}
                isEmpty={true}
                className="text-xl"
              />
            </div>

            {/* 중앙 박스 */}
            <div className="w-2/3 z-20 transition-all duration-500 transform scale-100 hover:scale-105">
              <ImageBox
                item={boxes[currentIndex]}
                isEmpty={true}
                className="text-2xl cursor-pointer"
                onClick={() => setIsCarousel(false)}
              />
            </div>

            {/* 오른쪽 박스 */}
            <div
              className="absolute right-0 w-1/3 opacity-50 hover:opacity-75 cursor-pointer transition-all duration-300 transform scale-95"
              onClick={() => handleSideBoxClick(nextIndex)}
            >
              <ImageBox
                item={boxes[nextIndex]}
                isEmpty={true}
                className="text-xl"
              />
            </div>
          </div>

          {/* 좌우 버튼과 인디케이터 */}
          <div className="flex justify-center items-center mt-4 space-x-4">
            <button
              onClick={handlePrev}
              className="text-white text-xl hover:text-gray-300 transition-transform transform hover:scale-110"
              disabled={boxes.length <= 1}
            >
              {"<"}
            </button>
            <div className="flex space-x-2">
              {boxes.map((_, index) => (
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
              disabled={boxes.length <= 1}
            >
              {">"}
            </button>
          </div>
        </div>
      ) : (
        <ImageGrid items={boxes} onClick={handleBoxClick} isEmpty={true} />
      )}
    </div>
  );
};

export default EmptyImage;
