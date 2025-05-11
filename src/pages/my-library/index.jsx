import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import HoverAction from "@/components/CreatePage/HoverAction";
import BookmarkedImages from "@/components/MyLibraryPage/BookmarkedImages";
import { useQuery } from "@tanstack/react-query";
import { image } from "@/apis/image/generate";
import Toast from "@/components/Common/Toast";
import { useHoverAction } from "@/lib/HoverActionContext";
import HistoryImage from "@/components/MyLibraryPage/HistoryImage";

const MyLibrary = () => {
  const { data: session, status } = useSession();
  const [formattedData, setFormattedData] = useState({});
  const [bookmarkedImages, setBookmarkedImages] = useState([]);
  const { showToast, toastMessage, setShowToast } = useHoverAction();

  console.log("세션", session);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["myLibrary"],
    queryFn: () => image.getMyLibrary(),
    enabled: status === "authenticated",
  });
  console.log("그룹화된 이미지:", formattedData);
  console.log("북마크된 이미지:", bookmarkedImages);

  useEffect(() => {
    console.log("라이브러리 데이터", data);
    const groupedImages = data?.reduce((acc, img) => {
      const date = new Date(img.created_at);
      const formattedDate = new Intl.DateTimeFormat("kr").format(date);
      if (!acc[formattedDate]) acc[formattedDate] = [];
      acc[formattedDate].push(img);
      return acc;
    }, {});
    setFormattedData(groupedImages);
    const bookmarked = data?.filter((img) => img.is_bookmarked);
    setBookmarkedImages(bookmarked);
  }, [data]);

  if (isError) {
    return (
      <div className="text-center py-10 text-red-500">
        데이터를 불러오지 못했습니다.
      </div>
    );
  }

  return (
    <>
      {isLoading ? (
        <div className="min-h-screen bg-black text-white py-10 px-4">
          로딩중...
        </div>
      ) : (
        <div className="flex flex-col items-center min-h-screen bg-black text-white py-24 px-4">
          <div className="w-full max-w-[109rem]">
            <BookmarkedImages images={bookmarkedImages} />
            <HistoryImage formattedData={formattedData} />
          </div>
        </div>
      )}
      {showToast && (
        <Toast onShow={() => setShowToast(false)}>{toastMessage}</Toast>
      )}
    </>
  );
};

export default MyLibrary;
