import React from "react";
import HoverAction from "../CreatePage/HoverAction";
import MyLibraryImageSection from "./MyLibraryImageSection";
const BookmarkedImages = ({ images }) => {
  return (
    <div className="mb-8">
      <h1 className="text-xl font-semibold mb-4">북마크 이미지</h1>
      {images?.length === 0 ? (
        <p className="text-center text-gray-500">북마크된 이미지가 없습니다.</p>
      ) : (
        <div className="relative grid grid-cols-2 gap-1 border-2 border-[#ffb1b1] rounded-lg py-4 px-2 bg-gray-950 sm:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-8">
          {images?.map((img) => (
            <MyLibraryImageSection key={img.id} image={img} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookmarkedImages;
