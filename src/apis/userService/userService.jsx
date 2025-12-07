import requestor from "../apis";
import ServerRequestor from "../serverApis";

export const userService = {
  signIn: async (req) => {
    const response = await ServerRequestor.post("/login", req);
    return response.data;
  },
  signUp: async (userData) => {
    const response = await requestor.post("/signup", userData);
    return response.data;
  },
  googleSignin: async () => {
    const response = await ServerRequestor.post(`/auth/google-login`);
    console.log(response.data);
    return response.data;
  },
};
