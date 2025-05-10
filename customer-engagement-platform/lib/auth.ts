import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

// Create a more resilient auth configuration
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/api/auth/signin",
    error: "/api/auth/error",
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }) {
      return session
    },
  },
  session: {
    strategy: "jwt",
  },
  // Add debug mode for development
  //debug: process.env.NODE_ENV === "development",
  // Make secret required to prevent errors
  //secret: process.env.NEXTAUTH_SECRET || "your-secret-key-change-in-production",
}
