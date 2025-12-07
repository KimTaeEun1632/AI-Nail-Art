"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { image } from "@/apis/image/generate";
import Toast from "@/components/Common/Toast";
import BookmarkedImages from "@/components/MyLibraryPage/BookmarkedImages";
import HistoryImage from "@/components/MyLibraryPage/HistoryImage";
import MyLibrarySkeleton from "@/components/MyLibraryPage/MyLibrarySkeleton";
import { useHoverAction } from "@/providers/HoverActionProvider";

export default function MyLibraryClient({ userId }) {
  const { showToast, toastMessage, setShowToast } = useHoverAction();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["myLibrary", userId],
    queryFn: () => image.getMyLibrary(),
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });

  const { formattedData, bookmarkedImages } = useMemo(() => {
    if (!data) return { formattedData: {}, bookmarkedImages: [] };

    const groupedImages = data.reduce((acc, img) => {
      const date = new Date(img.created_at);
      const formattedDate = new Intl.DateTimeFormat("ko-KR").format(date);
      if (!acc[formattedDate]) acc[formattedDate] = [];
      acc[formattedDate].push(img);
      return acc;
    }, {});

    const bookmarked = data.filter((img) => img.is_bookmarked);

    if (process.env.NODE_ENV === "development") {
      console.log("그룹화된 이미지:", groupedImages);
      console.log("북마크된 이미지:", bookmarked);
    }

    return { formattedData: groupedImages, bookmarkedImages: bookmarked };
  }, [data]);

  if (isError) {
    return (
      <div className="text-center py-10 text-red-500">
        데이터를 불러오지 못했습니다.
        {showToast && (
          <Toast onShow={() => setShowToast(false)}>
            {error?.message || toastMessage || "데이터를 불러오지 못했습니다."}
          </Toast>
        )}
      </div>
    );
  }

  if (isLoading) {
    return <MyLibrarySkeleton />;
  }

  return (
    <>
      <div className="flex flex-col items-center min-h-screen bg-black text-white py-24 px-4">
        <div className="w-full max-w-[109rem]">
          <BookmarkedImages images={bookmarkedImages} />
          <HistoryImage formattedData={formattedData} />
        </div>
      </div>
      {showToast && (
        <Toast onShow={() => setShowToast(false)}>{toastMessage}</Toast>
      )}
    </>
  );
}
