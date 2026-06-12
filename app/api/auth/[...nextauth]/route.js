import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Hardcoded admin — replace with env vars
        if (
          credentials.email === process.env.ADMIN_EMAIL &&
          credentials.password === process.env.ADMIN_PASSWORD
        ) {
          return { id: "1", name: "Admin", email: credentials.email };
        }
        return null; // Login fails
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login", // Custom login page (we'll build this)
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };