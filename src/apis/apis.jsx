import axios from "axios";
import { getSession, signIn } from "next-auth/react";

const axiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
};

const requestor = axios.create(axiosRequestConfig);

const updateSession = async (data) => {
  try {
    const response = await signIn("credentials", {
      accessToken: data?.accessToken,
      refreshToken: data?.refreshToken,
      id: data.user?.id,
      email: data.user?.email,
      nickname: data.user?.nickname,
      redirect: false,
    });
  } catch (error) {
    console.error("세션업데이트 에러:", error);
    throw error;
  }
};

requestor.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    if (session?.user?.accessToken) {
      config.headers.Authorization = `Bearer ${session.user.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

requestor.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;
    if (response?.status === 401) {
      const originalRequest = config;
      const session = await getSession();

      if (!session?.user?.refreshToken) {
        window.location.replace("/auth/signin");
        return Promise.reject(new Error("세션이 없거나, 리프레쉬 토큰 만료"));
      }

      try {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/refresh`,
          { refresh_token: session.user.refreshToken }
        );

        await updateSession({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          user: data.user,
        });

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return axios(originalRequest);
      } catch (e) {
        console.error("리프레쉬 토큰 에러:", e);
      }
    }

    console.error("API 에러:", error.message);
    return Promise.reject(error);
  }
);

export default requestor;
