import React from "react";
import HoverAction from "../CreatePage/HoverAction";
const BookmarkedImages = ({ images }) => {
  return (
    <div className="mb-8">
      <h1 className="text-xl font-semibold mb-4">북마크 이미지</h1>
      {images?.length === 0 ? (
        <p className="text-center text-gray-500">북마크된 이미지가 없습니다.</p>
      ) : (
        <div className="relative grid grid-cols-2 gap-1 border-2 border-[#ffb1b1] rounded-lg py-4 px-2 bg-gray-950 sm:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-8">
          {images?.map((img) => (
            <div
              key={img.id}
              className="rounded-lg shadow-md relative cursor-pointer transition-transform transform hover:border-[0.2rem] hover:border-[#6d6aff] group z-0"
            >
              <img
                src={`http://127.0.0.1:8000/${img.file_path}`}
                alt={img.prompt}
                className="w-full h-full object-cover"
              />
              <HoverAction image={img} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookmarkedImages;
