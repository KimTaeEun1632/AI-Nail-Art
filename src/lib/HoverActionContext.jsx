import { createContext, useContext, useState, useCallback } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

      // generatedImages 캐시 업데이트
      await queryClient.cancelQueries({ queryKey: ["generatedImages"] });
      const previousGenerated = queryClient.getQueryData(["generatedImages"]);
      if (previousGenerated) {
        const isBookmarked = previousGenerated.find(
          (img) => img.id === imageId
        )?.is_bookmarked;
        const updatedGenerated = previousGenerated.map((img) =>
          img.id === imageId ? { ...img, is_bookmarked: !isBookmarked } : img
        );
        queryClient.setQueryData(["generatedImages"], updatedGenerated);
      }

      return { previousData, previousGenerated };
    },
    onError: (err) => {
      setToastMessage("북마크 업데이트에 실패했습니다.");
      setShowToast(true);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["myLibrary"]);
    },
  });

  // 클립보드 복사
  const copyMutation = useMutation({
    mutationFn: async (imageUrl) => {
      const base64Response = await image.getImageBase64(imageUrl);
      const base64Url = base64Response.base64;
      const response = await fetch(base64Url);
      return response;
    },
    onSuccess: async (response) => {
      const contentType = response.headers.get("Content-Type") || "image/png";
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ [contentType]: blob }),
      ]);
      setToastMessage("이미지가 클립보드에 복사되었습니다.");
      setShowToast(true);
    },
    onError: (err) => {
      console.error("클립보드에러: ", err);
      setToastMessage("클립보드 복사에 실패했습니다:" + err.message);
      setShowToast(true);
    },
  });

  const copyToClipboard = useCallback(
    (imageUrl) => {
      copyMutation.mutate(imageUrl);
    },
    [copyMutation]
  );

  //이미지 다운로드
  const downloadMutation = useMutation({
    mutationFn: async (imageUrl) => {
      const base64Response = await image.getImageBase64(imageUrl);
      const base64Url = base64Response.base64;
      const response = await fetch(base64Url);
      return response;
    },
    onSuccess: async (response) => {
      const blob = await response.blob();

      const fileName = `nail-art.png`;

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setToastMessage(`이미지가 다운로드되었습니다`);
      setShowToast(true);
    },
    onError: (err) => {
      console.error("Download error:", err);
      setToastMessage("이미지 다운로드에 실패했습니다");
      setShowToast(true);
    },
  });

  const downloadImage = useCallback(
    (imageUrl) => {
      downloadMutation.mutate(imageUrl);
    },
    [downloadMutation]
  );

  //이미지 삭제

  const deleteImageMutation = useMutation({
    mutationFn: (imageId) => image.deleteImage(imageId),
    onSuccess: () => {
      setToastMessage("이미지가 삭제되었습니다.");
      setShowToast(true);
    },
    onMutate: async (imageId) => {
      await queryClient.cancelQueries({ queryKey: ["myLibrary"] });
      const previousLibraryData = queryClient.getQueryData(["myLibrary"]);
      if (previousLibraryData) {
        const updatedData = previousLibraryData.filter(
          (img) => img.id !== imageId
        );
        queryClient.setQueryData(["myLibrary"], updatedData);
      }

      return { previousLibraryData };
    },
    onError: (context) => {
      if (context.previousLibraryData) {
        queryClient.setQueryData(["myLibrary"], previousLibraryData);
      }
      setToastMessage("이미지 삭제에 실패했습니다.");
      setShowToast(true);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["myLibrary"]);
    },
  });

  const deleteImage = useCallback(
    (imageId) => {
      if (window.confirm("이미지를 삭제하시겠습니까?")) {
        console.log("Deleting imageId:", imageId);
        deleteImageMutation.mutate(imageId);
      }
    },
    [deleteImageMutation]
  );

  return (
    <HoverActionContext.Provider
      value={{
        handleBookmark: bookmarkMutation.mutate,
        showToast,
        toastMessage,
        setShowToast,
        copyToClipboard,
        downloadImage,
        deleteImage,
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
