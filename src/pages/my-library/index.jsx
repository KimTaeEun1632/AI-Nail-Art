import { useMemo } from "react";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { image } from "@/apis/image/generate";
import Toast from "@/components/Common/Toast";
import { useHoverAction } from "@/lib/HoverActionContext";
import BookmarkedImages from "@/components/MyLibraryPage/BookmarkedImages";
import HistoryImage from "@/components/MyLibraryPage/HistoryImage";
import MyLibrarySkeleton from "@/components/MyLibraryPage/MyLibrarySkeleton";

const MyLibrary = () => {
  const { data: session, status } = useSession();
  const { showToast, toastMessage, setShowToast } = useHoverAction();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["myLibrary"],
    queryFn: () => image.getMyLibrary(),
    enabled: status === "authenticated",
  });

  // 데이터 가공
  const { formattedData, bookmarkedImages } = useMemo(() => {
    if (!data) return { formattedData: {}, bookmarkedImages: [] };

    const groupedImages = data.reduce((acc, img) => {
      const date = new Date(img.created_at);
      const formattedDate = new Intl.DateTimeFormat("kr").format(date);
      if (!acc[formattedDate]) acc[formattedDate] = [];
      acc[formattedDate].push(img);
      return acc;
    }, {});

    const bookmarked = data.filter((img) => img.is_bookmarked);

    console.log("그룹화된 이미지:", groupedImages);
    console.log("북마크된 이미지:", bookmarked);

    return { formattedData: groupedImages, bookmarkedImages: bookmarked };
  }, [data]);

  if (isError) {
    return (
      <div className="text-center py-10 text-red-500">
        데이터를 불러오지 못했습니다.
      </div>
    );
  }

  if (isLoading || status === "loading") {
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
};

export default MyLibrary;
