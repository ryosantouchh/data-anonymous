import axios from "axios";
import { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface AppUser extends User {
  id: string;
  username: string;
  accessToken?: string;
}

export const nextAuthOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password", optional: true },
        accessToken: { label: "Access Token", type: "text", optional: true },
      },
      async authorize(credentials) {
        if (
          !credentials?.username ||
          (!credentials?.password && !credentials?.accessToken)
        ) {
          throw new Error(
            "username and either password or access token are required",
          );
        }
        try {
          if (credentials?.password) {
            const response = await axios.post(
              "http://localhost:3333/user/login",
              {
                username: credentials?.username,
                password: credentials?.password,
              },
            );

            const data = response.data;

            if (!data) {
              throw new Error("Invalid credentials");
            }

            return {
              username: data.data.user.username,
              accessToken: data.data.accessToken,
            } as AppUser;
          } else if (credentials?.accessToken) {
            return {
              username: credentials?.username,
              accessToken: credentials?.accessToken,
            } as AppUser;
          }
        } catch (err) {
          console.log("Login Error", err);
          throw new Error("Invalid credentials");
        }
        return null;
      },
    }),
  ],
  secret: "NEXTAUTH_SECRET", // HARD_CODE
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = (user as AppUser).id;
        token.accessToken = (user as AppUser).accessToken;
      }

      return token;
    },
    session: async ({ session, token }) => {
      return {
        ...session,
        accessToken: token.accessToken as string,
      };
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};
