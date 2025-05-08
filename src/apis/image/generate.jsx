import requestor from "../apis";

export const image = {
  generateImages: async (prompt) => {
    const nailPrompt = prompt + "nail art";
    console.log("프롬프트", nailPrompt);
    const response = await requestor.get(
      `/generate?prompt=${encodeURIComponent(`${nailPrompt}`)}&num_images=4`,
      {
        params: { nailPrompt },
      }
    );
    return response.data;
  },
  getMyLibrary: async () => {
    const response = await requestor.get("/images/my-library");
    return response.data;
  },
  postBookmark: async (imageId) => {
    const response = await requestor.post(`/images/bookmark/${imageId}`);
    return response.data;
  },
  getImageBase64: async (filePath) => {
    console.log(filePath);
    const response = await requestor.get(`/images/base64/${filePath}`);
    console.log("api 데이터", response.data);
    return response.data;
  },
};
