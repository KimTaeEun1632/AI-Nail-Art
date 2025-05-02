import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import HoverAction from "@/components/CreatePage/HoverAction";
import BookmarkedImages from "@/components/MyLibraryPage/BookmarkedImages";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { image } from "@/apis/image/generate";
import Toast from "@/components/Common/Toast";

const MyLibrary = () => {
  const { data: session, status } = useSession();
  const [formattedData, setFormattedData] = useState({});
  const [bookmarkedImages, setBookmarkedImages] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const queryClient = useQueryClient();

  console.log("세션", session);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["myLibrary"],
    queryFn: () => image.getMyLibrary(),
    enabled: status === "authenticated",
  });
  console.log("그룹화된 이미지:", formattedData);
  console.log("북마크된 이미지:", bookmarkedImages);

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
    onError: (err, context) => {
      queryClient.setQueryData(["myLibrary"], context.previousData);
      console.error("Bookmark mutation error:", err);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["myLibrary"]);
    },
  });

  const handleBookmarkToggle = (imageId) => {
    console.log("Toggling bookmark for image:", imageId);
    bookmarkMutation.mutate(imageId);
  };

  useEffect(() => {
    console.log("라이브러리 데이터", data);
    // 날짜별로 그룹화
    const groupedImages = data?.reduce((acc, img) => {
      const date = new Date(img.created_at);
      const formattedDate = new Intl.DateTimeFormat("kr").format(date);
      if (!acc[formattedDate]) acc[formattedDate] = [];
      acc[formattedDate].push(img);
      return acc;
    }, {});
    setFormattedData(groupedImages);
    // 북마크된 이미지만 추출
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
        <div>로딩중...</div>
      ) : (
        <div className="min-h-screen bg-black text-white py-10 px-4">
          <h1 className="text-3xl font-bold mb-12">내 라이브러리</h1>
          <BookmarkedImages images={bookmarkedImages} />
          {formattedData?.length === 0 ? (
            <p className="text-center text-gray-500">
              저장된 이미지가 없습니다.
            </p>
          ) : (
            Object.entries(formattedData || {})
              .sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA)) // 최신순 정렬
              .map(([date, images]) => (
                <div key={date} className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">{date}</h2>
                  <div className="flex overflow-x-auto space-x-4 pb-4">
                    {images.map((img) => (
                      <div
                        key={img.id}
                        className="flex-none w-32 h-32 border rounded-lg overflow-hidden shadow-md relative cursor-pointer transition-transform transform hover:border-[0.2rem] hover:border-[#6d6aff] group"
                      >
                        <img
                          src={`http://127.0.0.1:8000/${img.file_path}`}
                          alt={img.prompt}
                          className="w-full h-full object-cover"
                        />
                        <HoverAction
                          image={img}
                          onBookmarkToggle={handleBookmarkToggle}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))
          )}
        </div>
      )}
      {showToast && (
        <Toast onShow={() => setShowToast(false)}>{toastMessage}</Toast>
      )}
    </>
  );
};

export default MyLibrary;
