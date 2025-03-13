// components/ShowImageBox.jsx
import Image from "next/image";
import { useImages } from "@/lib/ImagesContext";
import EmptyImage from "@/components/CreatePage/EmptyImage";

const ShowImageBox = () => {
  const { images } = useImages();

  return (
    <div className="w-full max-w-5xl">
      {images.length > 0 ? (
        <div className="grid grid-cols-2 gap-1">
          {images.map((image) => (
            <div key={image.id} className="relative aspect-[5/3] w-full">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="rounded-3xl object-cover"
                priority={image.id === 1}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8//8/AwAI/AL+XlDx1gAAAABJRU5ErkJggg=="
              />
            </div>
          ))}
        </div>
      ) : (
        <EmptyImage />
      )}
    </div>
  );
};

export default ShowImageBox;
