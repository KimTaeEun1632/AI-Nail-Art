// app/api/auth/[...nextauth]/auth.js
import { auth } from "@/apis/auth/auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

// refreshAccessToken 함수 정의
async function refreshAccessToken(token) {
  try {
    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        refresh_token: token.refreshToken,
        grant_type: "refresh_token",
      }),
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      expiresAt: Math.floor(Date.now() / 1000) + refreshedTokens.expires_in,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // 새 refreshToken이 없으면 기존 유지
    };
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
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
          const user = await auth.signIn(reqBody);
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
    async jwt({ token, user, account }) {
      if (user && account) {
        token.id = user.id || account.providerAccountId;
        token.email = user.email;
        token.nickname = user.nickname || user.name;
        token.accessToken = user.accessToken || account.access_token;
        token.refreshToken = user.refreshToken || account.refresh_token;
        token.expiresAt = account.expires_at;
        return token;
      }
      if (Date.now() < token.expiresAt * 1000) {
        return token; // 유효하면 그대로 반환
      }

      // 토큰 만료 시 갱신
      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        email: token.email,
        nickname: token.nickname,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
      };
      session.expiresAt = token.expiresAt;
      return session;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(authOptions);
