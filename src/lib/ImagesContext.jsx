// lib/ImagesContext.jsx
import { createContext, useContext, useState } from "react";

const ImagesContext = createContext();

export const ImagesProvider = ({ children }) => {
  const [isCarousel, setIsCarousel] = useState(false);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <ImagesContext.Provider
      value={{
        images,
        loading,
        error,
        isCarousel,
        setImages,
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
