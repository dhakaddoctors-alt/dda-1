import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Mock authorization for now
        if (credentials.email === "admin@example.com" && credentials.password === "password") {
          return { id: "1", name: "Admin Profile", email: "admin@example.com", role: "admin" };
        }
        return null;
      }
    })
  ],
  callbacks: {
    jwt({ token, user }: any) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }: any) {
      if (session?.user) {
        session.user.role = token.role;
      }
      return session;
    }
  },
  session: { strategy: "jwt" }
});
