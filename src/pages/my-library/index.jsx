// components/MyLibrary.jsx
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import HoverAction from "@/components/CreatePage/HoverAction";
import BookmarkedImages from "@/components/MyLibraryPage/BookmarkedImages";

const MyLibrary = () => {
  const { data: session, status } = useSession();
  const [formattedData, setFormattedData] = useState({});
  const [error, setError] = useState(null);

  const fetchImages = async () => {
    if (!session?.user?.accessToken) {
      setError("로그인이 필요합니다.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/images/my-library`,
        {
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("인증에 실패했습니다. 다시 로그인해 주세요.");
        }
        throw new Error("이미지를 불러오지 못했습니다.");
      }
      const data = await response.json();
      console.log("라이브러리 데이터", data);
      // 날짜별로 그룹화
      const groupedImages = data.reduce((acc, img) => {
        const date = new Date(img.created_at);
        const formattedDate = new Intl.DateTimeFormat("kr").format(date);
        if (!acc[formattedDate]) acc[formattedDate] = [];
        acc[formattedDate].push(img);
        return acc;
      }, {});
      setFormattedData(groupedImages);
      console.log("그룹화된 이미지:", groupedImages);
    } catch (err) {
      setError(err.message);
      console.error("에러:", err);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchImages();
    }
  }, [status]);

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white py-10 px-4">
      <h1 className="text-3xl font-bold mb-12">내 라이브러리</h1>
      <BookmarkedImages />
      {Object.keys(formattedData).length === 0 ? (
        <p className="text-center text-gray-500">저장된 이미지가 없습니다.</p>
      ) : (
        Object.entries(formattedData).map(([date, images]) => (
          <div key={date} className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{date}</h2>
            <div className="flex overflow-x-auto space-x-4 pb-4">
              {images.map((img) => (
                <div
                  key={img.id}
                  className="flex-none w-32 h-32 border rounded-lg overflow-hidden shadow-md relative cursor-pointer transition-transform transform  hover:border-[0.2rem] hover:border-[#6d6aff] group"
                >
                  <img
                    src={`http://127.0.0.1:8000/${img.file_path}`}
                    alt={img.prompt}
                    className="w-full h-full object-cover"
                  />
                  <HoverAction />
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyLibrary;
