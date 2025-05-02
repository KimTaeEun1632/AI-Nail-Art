import requestor from "../apis";

export const image = {
  generateImages: async (prompt) => {
    const response = await requestor.get(
      `/generate?prompt=${encodeURIComponent(
        prompt + "nail art"
      )}&num_images=4`,
      {
        params: { prompt },
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
};
