// src/auth.jsx

import { userService } from "@/apis/userService/userService";
import axios from "axios";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

// // refreshAccessToken 함수 정의
// async function refreshAccessToken(token) {
//   try {
//     const { data } = await axios.post(
//       `${process.env.NEXT_PUBLIC_API_BASE_URL}/refresh`,
//       { refresh_token: session.user.refreshToken }
//     );

//     await updateSession({
//       accessToken: data.accessToken,
//       refreshToken: data.refreshToken,
//       user: data.user,
//     });

//     originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
//     return axios(originalRequest);
//   } catch (e) {
//     console.error("리프레쉬 토큰 에러:", e);
//   }
// }

export const { signIn, signOut, auth, handlers, update } = NextAuth({
  providers: [
    Google({
      authorization: {
        params: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          // 토큰 기반 인증
          if (credentials.accessToken && credentials.refreshToken) {
            return {
              id: credentials.id,
              email: credentials.email,
              nickname: credentials.nickname,
              accessToken: credentials.accessToken,
              refreshToken: credentials.refreshToken,
            };
          }
          // 이메일/비밀번호 인증
          if (!credentials.email || !credentials.password) {
            throw new Error("Email and password are required");
          }
          const reqBody = {
            email: credentials.email,
            password: credentials.password,
          };
          const user = await userService.signIn(reqBody);

          return {
            id: user.user.id,
            email: user.user.email,
            nickname: user.user.nickname,
            accessToken: user.accessToken,
            refreshToken: user.refreshToken,
          };
        } catch (error) {
          console.error("Authorize failed:", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    jwt: async ({ token, user }) => {
      if (user?.accessToken) {
        token.id = user.id;
        token.email = user.email;
        token.nickname = user.nickname;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token?.accessToken) {
        session.id = token.id;
        session.email = token.email;
        session.nickname = token.nickname;
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
      }
      return session;
    },
  },

  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,

  pages: {
    signIn: "/login",
  },
});
