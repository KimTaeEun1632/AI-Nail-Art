// context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 초기 상태 로드
  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");
    const storedRefreshToken = localStorage.getItem("refreshToken");
    if (storedAccessToken && storedRefreshToken) {
      setAccessToken(storedAccessToken);
      setRefreshToken(storedRefreshToken);
      setIsAuthenticated(true);
    }
  }, []);

  // 로그인
  const login = async (email, password) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/login", {
        email,
        password,
      });
      const { access_token, refresh_token } = response.data;
      setAccessToken(access_token);
      setRefreshToken(refresh_token);
      setIsAuthenticated(true);
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("refreshToken", refresh_token);
    } catch (error) {
      throw new Error("Login failed");
    }
  };

  // 로그아웃
  const logout = async () => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setAccessToken(null);
      setRefreshToken(null);
      setIsAuthenticated(false);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // 토큰 갱신
  const refreshAccessToken = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/refresh", {
        refresh_token: refreshToken,
      });
      const { access_token, refresh_token } = response.data;
      setAccessToken(access_token);
      setRefreshToken(refresh_token);
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("refreshToken", refresh_token);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Token refresh failed:", error);
      logout(); // 리프레시 실패 시 로그아웃
    }
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        isAuthenticated,
        login,
        logout,
        refreshAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
