import React from "react";

const EmptyImage = () => {
  return (
    <div className="w-full h-full max-w-[75rem] min-w-[0] max-h-[full] flex-1 overflow-hidden">
      <div className="grid grid-cols-2 gap-[0.25rem] w-full h-full">
        <div className="w-full h-full max-w-full rounded-3xl min-w-full bg-[#2D2D2D]">
          이미지 1
        </div>
        <div className="w-full h-full max-w-full rounded-3xl min-w-full bg-[#2D2D2D]">
          이미지 1
        </div>
        <div className="w-full h-full max-w-full rounded-3xl min-w-full bg-[#2D2D2D]">
          이미지 1
        </div>
        <div className="w-full h-full max-w-full rounded-3xl min-w-full bg-[#2D2D2D]">
          이미지 1
        </div>
      </div>
    </div>
  );
};

export default EmptyImage;
