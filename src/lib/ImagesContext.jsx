// lib/ImagesContext.jsx
import { useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useState } from "react";

const ImagesContext = createContext();

export const ImagesProvider = ({ children }) => {
  const [isCarousel, setIsCarousel] = useState(false);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const queryClient = useQueryClient();

  console.log("이미지 프로바이더", images);

  const updateImages = (newImages) => {
    setImages(newImages);
    queryClient.setQueryData(["generatedImages"], newImages);
  };

  return (
    <ImagesContext.Provider
      value={{
        images,
        loading,
        error,
        isCarousel,
        setImages: updateImages,
        setLoading,
        setError,
        setIsCarousel,
      }}
    >
      {children}
    </ImagesContext.Provider>
  );
};

export const useImages = () => {
  const context = useContext(ImagesContext);
  if (!context)
    throw new Error("useImages must be used within an ImagesProvider");
  return context;
};
