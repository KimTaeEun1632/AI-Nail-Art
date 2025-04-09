// lib/api.js
import axios from "axios";
import { getSession, signIn, signOut } from "next-auth/react";

const requestor = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
});

// 요청 인터셉터: 모든 요청에 액세스 토큰 추가
requestor.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const session = await getSession();
        if (!session || !session.refreshToken) {
          throw new Error("No refresh token available");
        }
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/refresh`,
          {
            refresh_token: session.refreshToken,
          }
        );
        const { accessToken, refreshToken, user } = response.data;

        // 세션 업데이트

        await signIn("credentials", {
          email: user.email,
          password: null,
          accessToken,
          refreshToken,
          redirect: false,
        });

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        await signOut({ callbackUrl: "/" });
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default requestor;
