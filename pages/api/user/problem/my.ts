import type { NextApiRequest, NextApiResponse } from "next";
import createHttpError from "http-errors";
import { getSession } from "next-auth/react";
import { apiHandler } from "../../../../utils/api/api.handler";
import prisma from "../../../../lib/prisma";
import { Problem } from ".prisma/client";

async function getUserSolvedProblems(
  req: NextApiRequest,
  res: NextApiResponse<Problem[]>
) {
  const { search } = req.query;
  const session = await getSession({ req });

  if (Array.isArray(search)) throw new createHttpError.BadRequest();

  const users = await prisma.problem.findMany({
    where: {
      id: session.user.id,
      students: {
        some: {
          id: session.user.id,
        },
      },
    },
  });

  return res.json(users);
}

export default apiHandler({
  GET: { handler: getUserSolvedProblems },
});
