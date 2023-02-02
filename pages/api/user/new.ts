import type { NextApiRequest, NextApiResponse } from "next";
import createHttpError from "http-errors";
import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";
import { apiHandler } from "../../../utils/api/api.handler";
import { Role } from "@prisma/client";

export type PatchNewUserReq = {
  cfUsername: string;
  role: Role;
};

async function patchNewUser(req: NextApiRequest, res: NextApiResponse) {
  const { cfUsername, role }: PatchNewUserReq = req.body;
  const session = await getSession({ req });

  if (session.user.cfUsername) {
    throw new createHttpError.BadRequest();
  }

  const user = await prisma.user.update({
    where: { email: session.user.email },
    data: { cfUsername, role },
  });

  res.json(user);
}

export default apiHandler({
  PATCH: { handler: patchNewUser, requiredRoles: "authenticated-user" },
});
