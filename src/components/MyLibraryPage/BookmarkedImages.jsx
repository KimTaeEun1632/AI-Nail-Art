import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const BookmarkedImages = () => {
  const { data: session, status } = useSession();
  const [error, setError] = useState();

  console.log("북마크 페이지 세션", session);

  const fetchBookmarkedImages = async () => {
    if (!session?.user?.accessToken) {
      setError("로그인이 필요합니다.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/images/bookmarked`,
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
      console.log("북마크 데이터", data);
    } catch (err) {
      setError(err.message);
      console.error("에러:", err);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchBookmarkedImages();
    }
  }, []);

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }
  return <div>북마크된 이미지 컴포넌트</div>;
};

export default BookmarkedImages;
