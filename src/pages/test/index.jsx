import EmptyLayout from "@/components/Layout/EmptyLayout";
import React, { useEffect, useState } from "react";

const testData = [
  {
    id: 8,
    file_path: "uploads/3_20250419_081133_3.png",
    prompt:
      "Cute and colorful fruit-inspired nail art with kaw…against a soft pink or yellow background nail art",
    created_at: "2025-04-19T08:11:33.513111",
  },
  {
    id: 7,
    file_path: "uploads/3_20250419_081133_2.png",
    prompt:
      "Cute and colorful fruit-inspired nail art with kaw…against a soft pink or yellow background nail art",
    created_at: "2025-04-19T08:11:33.329414",
  },
  {
    id: 6,
    file_path: "uploads/3_20250419_081133_1.png",
    prompt:
      "Cute and colorful fruit-inspired nail art with kaw…against a soft pink or yellow background nail art",
    created_at: "2025-04-19T08:11:33.118918",
  },
];

const index = () => {
  const [testImage, setTestImage] = useState({});

  useEffect(() => {
    const groupedImages = testData.reduce((acc, img) => {
      const date = new Date(img.created_at);
      const a = new Intl.DateTimeFormat("kr").format(date);
      console.log(a);
      if (!acc[a]) acc[a] = [];
      acc[a].push(img);
      return acc;
    }, {});
    setTestImage(groupedImages);
  }, []);

  console.log(testImage);

  return Object.entries(testImage).map(([a, images]) => (
    <div>
      <div>
        <h1>{a}</h1>
      </div>
      <div>
        {images.map((img) => (
          <div>{img.prompt}</div>
        ))}
      </div>
    </div>
  ));
};

export default index;

index.getLayout = function getLayout(page) {
  return <EmptyLayout>{page}</EmptyLayout>;
};
