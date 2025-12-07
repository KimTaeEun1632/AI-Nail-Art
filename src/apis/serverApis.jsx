"use server";

import axios from "axios";
import { auth } from "@/auth";
import { signIn } from "next-auth/react";

const axiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
};

const ServerRequestor = axios.create(axiosRequestConfig);

ServerRequestor.interceptors.request.use(
  async (config) => {
    const session = await auth();
    if (session?.user?.accessToken) {
      config.headers.Authorization = `Bearer ${session.user.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

ServerRequestor.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401 && !error.config._retry) {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/refresh`
        );
        const { accessToken } = res.data;
        error.config.headers.Authorization = `Bearer ${accessToken}`;
        error.config._retry = true;
        return ServerRequestor(error.config);
      } catch (e) {
        signIn();
        console.error("리프레쉬 토큰 에러:", e);
        return Promise.reject(error);
      }
    }
    console.error("API 에러:", error.message);
    return Promise.reject(error);
  }
);

export default ServerRequestor;
