import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { dbConnect } from "@/lib/dbConnect";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
          label: "User Email",
          type: "email",
          placeholder: "User Email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },

      async authorize(credentials) {
        const userCollection = await dbConnect("users");

        const user = await userCollection.findOne({ email: credentials.email });
        if (!user) return null;

        const isMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );
          if (!isMatch) return null;
          
        await userCollection.updateOne(
          { email: credentials.email },
          { $set: { last_login: new Date() } }
        );

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
