import { image } from "@/apis/image/generate";
import React, { useEffect } from "react";

const MyLibrary = () => {
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const images = await image.getMyLibrary();
        console.log(images);
      } catch {
        console.log("에러");
      }
    };

    fetchImages();
  }, []);
  return <div>내 라이브러리 페이지 입니다.</div>;
};

export default MyLibrary;
