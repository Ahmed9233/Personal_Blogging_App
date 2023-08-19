import { getUserByEmail, verifyUserPassword } from "@/services/user";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions = {
  // Configure one or more authentication providers
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      async authorize({ email, password }) {
        const user = getUserByEmail(email);
        if (!user) {
          throw new Error("User not Found");
        }
        const isValid = await verifyUserPassword(user.password, password);
        if (!isValid) {
          throw new Error("Incorrect Password");
        }

        return { email };
      },
    }),
  ],
};
export default NextAuth(authOptions);
