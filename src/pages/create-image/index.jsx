import { image } from "@/apis/image/generate";
import LiveBackground from "@/components/Common/LiveBackground";
import PromptInput from "@/components/CreatePage/PromptInput";
import ShowImageBox from "@/components/CreatePage/ShowImageBox";
import { useImages } from "@/lib/ImagesContext";
import { useMutation } from "@tanstack/react-query";

import React from "react";

const CreatePage = () => {
  const { setImages, setError } = useImages();

  const generateMutation = useMutation({
    mutationFn: (prompt) => image.generateImages(prompt),
    onSuccess: (data) => {
      const generatedImages = data.images.map((img) => ({
        id: img.id,
        src: `data:image/png;base64,${img.base64}`,
        alt: `Generated nail art image ${img.id}`,
      }));
      setImages(generatedImages);
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const loading = generateMutation.isPending;

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-black text-white">
      <div className="flex w-full h-full flex-col justify-between items-center gap-5 py-6 mt-20">
        {loading && <LiveBackground />}
        <ShowImageBox />
        <PromptInput generateMutation={generateMutation} loading={loading} />
      </div>
    </div>
  );
};

export default CreatePage;
