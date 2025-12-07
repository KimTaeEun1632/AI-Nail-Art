import { userService } from "@/apis/userService/userService";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

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
    signIn: async ({ account, profile }) => {
      if (account?.provider === "google") {
        return !!profile?.email_verified;
      }
      return true;
    },
    jwt: async ({ token, user, account, profile }) => {
      if (user?.accessToken) {
        token.id = user.id;
        token.email = user.email;
        token.nickname = user.nickname;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.expiresAt = Math.floor(Date.now() / 1000) + 30 * 60;
      } else if (account?.provider === "google" && profile?.email) {
        try {
          //  백엔드의 social-login 엔드포인트 호출
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/social-login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: profile.email,
                nickname: profile.name || profile.given_name,
                provider_id: profile.sub,
                provider: "google",
              }),
            }
          );

          if (response.ok) {
            const data = await response.json(); // 백엔드에서 받은 토큰 정보로 토큰 업데이트
            token.id = data.user.id;
            token.email = data.user.email;
            token.nickname = data.user.nickname;
            token.accessToken = data.accessToken;
            token.refreshToken = data.refreshToken;
            token.expiresAt = Math.floor(Date.now() / 1000) + 30 * 60;
          } else {
            // 백엔드 처리 실패 시 로그인 강제 실패 처리
            console.error("백엔드 소셜 로그인 실패:");
            return null;
          }
        } catch (error) {
          console.error("소셜 로그인 중 에러 발생:", error);
          return null;
        }
      }
      if (Date.now() > token.expiresAt * 1000) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/refresh`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ refreshToken: token.refreshToken }),
            }
          );
          const data = await response.json();
          token.accessToken = data.accessToken;
          token.refreshToken = data.refreshToken;
          token.expiresAt = data.expiresAt;
        } catch (error) {
          return { ...token, error: "RefreshAccessTokenError" };
        }
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token?.accessToken) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.nickname = token.nickname;
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
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
