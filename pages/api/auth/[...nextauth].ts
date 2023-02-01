import { NextApiHandler } from "next";
import NextAuth, { AuthOptions, Session } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GitHubProvider from "next-auth/providers/github";
import prisma from "../../../lib/prisma";

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const options: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
  pages: {
    newUser: "/auth/new-user",
  },
  callbacks: {
    //@ts-ignore
    async session(session) {
      const user = await prisma.user.findFirst({
        where: { email: session.user.email },
      });

      session.user = user;

      return session;
    },
  },
};
