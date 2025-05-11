import Image from "next/image";
import React from "react";
import HoverAction from "../CreatePage/HoverAction";

const MyLibraryImageSection = ({ image }) => {
  const filePath = `http://127.0.0.1:8000/${image.file_path}`;

  return (
    <div
      key={image.id}
      className="border rounded-lg shadow-md relative cursor-pointer transition-transform transform hover:border-[0.2rem] hover:border-[#6d6aff] group z-0"
    >
      <Image
        src={filePath}
        alt={image.prompt}
        width={243}
        height={243}
        className="object-cover rounded-lg "
      />
      <HoverAction image={image} />
    </div>
  );
};

export default MyLibraryImageSection;
