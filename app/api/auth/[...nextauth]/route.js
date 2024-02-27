import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/user";
import { connectMongoDB } from "@/lib/mongodb";

export const authOptions = {
  session: {
    strategy: "jwt",
    maxAge: 3000,
  },
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "E-mail", type: "text", placeholder: "e-mail" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          await connectMongoDB();
          const user = await User.findOne({ email });

          if (!user) return null;

          const passMatch = await bcrypt.compare(password, user.password);

          if (!passMatch) return null;

          console.log(user);
          return { id: user.id.toString(), email: user.email, name: user.name };
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
