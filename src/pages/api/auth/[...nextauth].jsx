import { auth } from "@/apis/auth/auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      type: "credentials",
      credentials: {
        username: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const response = await auth.signIn({
            email: credentials.username,
            password: credentials.password,
          });
          const { user, accessToken, refreshToken } = response;
          if (accessToken) {
            return {
              accessToken,
              refreshToken,
              email: user.email,
              id: user.id,
              nickname: user.nickname,
            };
          }
          return null;
        } catch (error) {
          console.error("Login failed", error);
          return null;
        }
      },
    }),
  ],

  callback: {
    async signIn({ credentials }) {
      if (credentials) {
        return true;
      } else {
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.email = user.email;
        token.id = user.id;
        token.nickname = user.nickname;
      }
      return token;
    },
    async session({ session, token }) {
      if (!session.user) {
        session.user = {};
      }
      if (token) {
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        session.user.email = token.email;
        session.user.id = token.id;
        session.user.nickname = token.nickname;
      }
      return session;
    },
  },

  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "auth/signin",
  },
};

export default NextAuth(authOptions);
