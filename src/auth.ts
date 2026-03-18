import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { JWT } from "next-auth/jwt";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";
import { getRuntimeDb } from "@/lib/cloudflare";
import { verifyPassword } from "@/lib/password";

type SessionUser = {
  id?: string;
  name?: string | null;
  email?: string | null;
  role?: string;
};

type SessionToken = JWT & {
  role?: string;
};

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  secret: process.env.AUTH_SECRET ?? "replace-this-auth-secret-in-cloudflare",
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const email = String(credentials.email ?? "").trim().toLowerCase();
        const password = String(credentials.password ?? "");
        if (!email || !password) {
          return null;
        }

        const db = getRuntimeDb();
        const [user] = await db
          .select({
            id: users.id,
            name: users.name,
            email: users.email,
            passwordHash: users.passwordHash,
            role: users.role,
          })
          .from(users)
          .where(eq(users.email, email))
          .limit(1);

        if (!user || !(await verifyPassword(password, user.passwordHash))) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role ?? "member",
        };
      }
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      const typedToken = token as SessionToken;
      const typedUser = user as SessionUser | undefined;

      if (user) {
        typedToken.sub = typedUser?.id;
        typedToken.name = typedUser?.name ?? null;
        typedToken.email = typedUser?.email ?? null;
        typedToken.role = typedUser?.role;
      }
      return typedToken;
    },
    session({ session, token }) {
      const typedToken = token as SessionToken;
      if (session?.user) {
        if (typedToken.sub) {
          session.user.id = typedToken.sub;
        }
        session.user.role = typedToken.role ?? "user";
      }
      return session;
    }
  },
  session: { strategy: "jwt" }
});
