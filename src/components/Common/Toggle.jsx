import { useImages } from "@/lib/ImagesContext";
import { motion } from "framer-motion";
import React from "react";

const Toggle = () => {
  const { isCarousel, setIsCarousel } = useImages();

  const handleToggle = () => {
    setIsCarousel(!isCarousel);
  };

  return (
    <div
      onClick={handleToggle}
      className={`relative h-6 w-12 cursor-pointer rounded-full border border-white/15 ${
        isCarousel ? "bg-[#6d6aff]" : "bg-transparent"
      } p-[1px]`}
    >
      {/* 토글 버튼 */}
      <motion.div
        initial={false}
        animate={{ x: isCarousel ? 21 : 0 }} // x축 이동
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="absolute top-0.6 left-1 h-5 w-5 rounded-full bg-white"
      />
    </div>
  );
};

export default Toggle;
