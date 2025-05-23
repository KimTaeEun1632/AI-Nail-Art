import { image } from "@/apis/image/generate";
import LiveBackground from "@/components/Common/LiveBackground";
import Toast from "@/components/Common/Toast";
import PromptInput from "@/components/CreatePage/PromptInput";
import ShowImageBox from "@/components/CreatePage/ShowImageBox";
import { useHoverAction } from "@/lib/HoverActionContext";
import { useImages } from "@/lib/ImagesContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import React from "react";

const CreatePage = () => {
  const { setImages, setError, setLoading } = useImages();
  const { showToast, toastMessage, setShowToast } = useHoverAction();
  const queryClient = useQueryClient();

  const generateMutation = useMutation({
    mutationFn: (prompt) => image.generateImages(prompt),
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (data) => {
      const generatedImages = data.images.map((img) => ({
        id: img.id,
        file_path: `data:image/png;base64,${img.base64}`,
        alt: `Generated nail art image ${img.id}`,
        is_bookmarked: img.is_bookmarked || false,
      }));
      setImages(generatedImages);
      queryClient.setQueryData(["generatedImages"], generatedImages);
    },
    onError: (err) => {
      setError(err.message);
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const loading = generateMutation.isPending;

  return (
    <>
      <div className="relative flex min-h-screen w-full items-center justify-center bg-black text-white">
        <div className="flex w-full h-full flex-col justify-between items-center gap-5 py-6 mt-20">
          {loading && <LiveBackground />}
          <ShowImageBox />
          <PromptInput generateMutation={generateMutation} loading={loading} />
        </div>
      </div>
      {showToast && (
        <Toast onShow={() => setShowToast(false)}>{toastMessage}</Toast>
      )}
    </>
  );
};

export default CreatePage;
