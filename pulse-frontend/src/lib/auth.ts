import axios from "axios";
import type { NextAuthOptions, SessionStrategy } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Extend the built-in session types
declare module "next-auth" {
  interface Session {
    token?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    signedToken?: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" as SessionStrategy },

  callbacks: {
    async jwt({ token, account }) {
      if (account?.access_token) {
        token.accessToken = account.access_token;

        try {
          const response = await axios.get(
            `${process.env.BACKEND_URL}/api/v1/auth/google`,
            {
              headers: {
                Authorization: `Bearer ${account.access_token}`,
              },
            },
          );

          // Backend returns: { token: string, user: { id: number, email: string } }
          token.signedToken = response.data.token;
        } catch (error) {
          console.error("Error signing token:", error);
          // Don't return null here as it will break the auth flow
          // Just log the error and continue
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token.signedToken) {
        session.token = token.signedToken;
      }
      return session;
    },
  },
};
