import type { NextApiRequest, NextApiResponse } from "next";
import createHttpError from "http-errors";
import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";
import { apiHandler } from "../../../utils/api/api.handler";

export type PostNewUserReq = {
  cfUsername: string;
  isProfessor: boolean;
};

//TODO: Add new data in session and verify if user already has cfUsername.
async function postNewUser(req: NextApiRequest, res: NextApiResponse) {
  const { cfUsername, isProfessor }: PostNewUserReq = req.body;
  const session = await getSession({ req });
  const user = await prisma.user.update({
    where: { email: session.user.email },
    data: { cfUsername, role: isProfessor ? "PROFESSOR" : "STUDENT" },
  });

  res.json(user);
}

export default apiHandler({
  POST: postNewUser,
});
