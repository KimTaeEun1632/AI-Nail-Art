import requestor from "../apis";

export const auth = {
  signIn: async (req) => {
    const response = await requestor.post("/login", req);
    return response.data;
  },
  signUp: async (userData) => {
    const response = await requestor.post("/signup", userData);
    return response.data;
  },
};
