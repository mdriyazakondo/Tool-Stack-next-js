import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import { dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password)
            throw new Error("Missing credentials");

          const users = await dbConnect("users");
          const user = await users.findOne({ email: credentials.email });
          if (!user) throw new Error("User not found");

          const isMatch = await bcrypt.compare(
            credentials.password,
            user.password,
          );
          if (!isMatch) throw new Error("Invalid password");
          await users.updateOne(
            { email: user.email },
            {
              $set: {
                last_login: new Date(),
                updatedAt: new Date(),
              },
            },
          );

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role || "user",
          };
        } catch (err) {
          console.error("Authorize error:", err);
          throw new Error(err.message || "Authorization failed");
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account.provider === "google") {
          const users = await dbConnect("users");
          const existing = await users.findOne({ email: user.email });
          if (!existing) {
            await users.insertOne({
              fullName: user.name,
              email: user.email,
              photo: user.image,
              role: "user",
              provider: "google",
              date: new Date(),
            });
          } else {
            await users.updateOne(
              { email: user.email },
              {
                $set: {
                  updatedAt: new Date(),
                  last_login: new Date(),
                },
              },
            );
          }
        }
        return true;
      } catch (err) {
        console.error("SignIn error:", err);
        return false;
      }
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role || "user";
      } else if (token.email) {
        const users = await dbConnect("users");
        const dbUser = await users.findOne({ email: token.email });
        if (dbUser) {
          token.id = dbUser._id.toString();
          token.role = dbUser.role || "user";
        }
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },

    async redirect() {
      return "/"; // default redirect
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
