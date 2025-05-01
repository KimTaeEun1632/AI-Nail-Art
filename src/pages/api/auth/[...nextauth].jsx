// app/api/auth/[...nextauth]/auth.js
import { auth } from "@/apis/auth/auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
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
    async signIn({ credentials }) {
      if (credentials) {
        return true;
      } else {
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.nickname = user.nickname;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        email: token.email,
        nickname: token.nickname,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
      };
      return session;
    },
  },

  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/auth/signin",
  },
};

export default NextAuth(authOptions);
