import React from "react";
import HoverAction from "../CreatePage/HoverAction";

const HistoryImage = ({ formattedData }) => {
  const data = Object.entries(formattedData || {}).sort(
    ([dateA], [dateB]) => new Date(dateB) - new Date(dateA)
  );

  console.log("이거 가능?:", data);

  return (
    <div>
      {data.length === 0 ? (
        <div className="flex flex-col pt-20">
          <h1 className="text-xl font-bold">저장된 이미지</h1>
          <p className="text-center text-gray-500 ">
            저장된 이미지가 없습니다.
          </p>
        </div>
      ) : (
        <div>
          {data.map(([date, images]) => (
            <div key={date} className="mb-8">
              <h2 className="text-xl font-semibold mb-4">{date}</h2>
              <div className="grid grid-cols-2 gap-x-1 pb-4 sm:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-8">
                {images.map((img) => (
                  <div
                    key={img.id}
                    className="border rounded-lg overflow-hidden shadow-md relative cursor-pointer transition-transform transform hover:border-[0.2rem] hover:border-[#6d6aff] group"
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryImage;
