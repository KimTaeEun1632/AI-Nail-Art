import React from "react";

const MyLibrarySkeleton = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-black text-white py-24 px-4">
      <div className="w-full max-w-[109rem]">
        <div className="mb-8">
          <h1 className="text-xl font-semibold mb-4">북마크 이미지</h1>
          <div className="grid grid-cols-2 gap-1 sm:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-8">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-[#2D2D2D] skeleton rounded-lg aspect-square  max-w-[243px] w-full"
              ></div>
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-xl font-bold pt-20 pb-4">저장된 이미지</h1>
          <div className="grid grid-cols-2 gap-1 sm:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-8">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-[#2D2D2D] skeleton rounded-lg aspect-square  max-w-[243px] w-full"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyLibrarySkeleton;
