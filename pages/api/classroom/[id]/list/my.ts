import createHttpError from "http-errors";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../../../lib/prisma";
import { apiHandler } from "../../../../../utils/api/api.handler";

async function getProblemLists(req: NextApiRequest, res: NextApiResponse) {
  const { id: classroomId } = req.query;

  const session = await getSession({ req });

  if (Array.isArray(classroomId)) throw new createHttpError.BadRequest();

  const problemLists = await prisma.problemList.findMany({
    where: { classroomId: classroomId },
    include: {
      tags: true,
      problems: {
        include: { tags: true, students: { where: { id: session.user.id } } },
      },
    },
  });

  return res.json(problemLists);
}

export default apiHandler({
  GET: {
    handler: getProblemLists,
    requiredRoles: "authenticated-user",
  },
});
