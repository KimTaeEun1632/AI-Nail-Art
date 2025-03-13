const ImageContext = React.createContext();

const ImageProvider = ({ children }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <ImageContext.Provider value={{ images, setImages, loading, setLoading }}>
      {children}
    </ImageContext.Provider>
  );
};
