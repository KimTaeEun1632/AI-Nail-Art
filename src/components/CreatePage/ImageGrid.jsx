import React from "react";
import Image from "next/image";

const ImageBox = ({ item, onClick, isEmpty, className, children }) => (
  <div
    className={`relative aspect-[5/3] rounded-3xl bg-[#2D2D2D] flex items-center justify-center cursor-pointer text-white transition-transform transform hover:scale-105 ${className}`}
    onClick={onClick}
  >
    {isEmpty ? (
      <span className="text-xl">{item.text}</span>
    ) : (
      <Image
        src={item.src}
        alt={item.alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="rounded-3xl object-cover"
        priority={item.id === 1}
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8//8/AwAI/AL+XlDx1gAAAABJRU5ErkJggg=="
      />
    )}
    {children}
  </div>
);

const ImageGrid = ({ items, onClick, isEmpty = false }) => (
  <div className="grid grid-cols-2 gap-1">
    {items.map((item, index) => (
      <ImageBox
        key={item.id}
        item={item}
        onClick={() => onClick(index)}
        isEmpty={isEmpty}
      />
    ))}
  </div>
);

export { ImageGrid, ImageBox };
