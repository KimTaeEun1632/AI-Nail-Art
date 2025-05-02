import { createContext, useContext, useState, useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { image } from "@/apis/image/generate";

const HoverActionContext = createContext();

export const HoverActionProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  //북마크 토글
  const bookmarkMutation = useMutation({
    mutationFn: (imageId) => image.postBookmark(imageId),
    onSuccess: (data) => {
      setToastMessage(
        data.is_bookmarked
          ? "북마크가 추가되었습니다."
          : "북마크가 해제되었습니다."
      );
      setShowToast(true);
      return data;
    },
    onMutate: async (imageId) => {
      await queryClient.cancelQueries({ queryKey: ["myLibrary"] });
      const previousData = queryClient.getQueryData(["myLibrary"]);
      if (previousData) {
        const isBookmarked = previousData.find(
          (img) => img.id === imageId
        )?.is_bookmarked;
        const updatedData = previousData.map((img) =>
          img.id === imageId ? { ...img, is_bookmarked: !isBookmarked } : img
        );
        queryClient.setQueryData(["myLibrary"], updatedData);
      }

      return { previousData };
    },
    onError: (err) => {
      setToastMessage("북마크 업데이트에 실패했습니다.");
      setShowToast(true);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["myLibrary"]);
    },
  });

  return (
    <HoverActionContext.Provider
      value={{
        handleBookmark: bookmarkMutation.mutate,
        showToast,
        toastMessage,
        setShowToast,
      }}
    >
      {children}
    </HoverActionContext.Provider>
  );
};

export const useHoverAction = () => {
  const context = useContext(HoverActionContext);
  if (!context) throw new Error("useHoverAction 에러");
  return context;
};
