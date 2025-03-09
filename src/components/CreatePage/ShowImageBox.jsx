import React from "react";

const ShowImageBox = () => {
  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-2 gap-[0.25rem] max-w-[150rem] min-w-[0] max-h-[full]  h-full flex-1">
        <div className="w-full h-full max-w-full min-w-full bg-gray-300">
          이미지 1
        </div>
        <div className="w-full h-full max-w-full min-w-full bg-gray-300">
          이미지 1
        </div>
        <div className="w-full h-full max-w-full min-w-full bg-gray-300">
          이미지 1
        </div>
        <div className="w-full h-full max-w-full min-w-full bg-gray-300">
          이미지 1
        </div>
      </div>
    </div>
  );
};

export default ShowImageBox;
