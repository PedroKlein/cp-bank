import type { NextApiRequest, NextApiResponse } from "next";
import createHttpError from "http-errors";
import { getSession } from "next-auth/react";
import { apiHandler } from "../../../../utils/api/api.handler";
import prisma from "../../../../lib/prisma";

async function getMyProblemsLists(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  const classrooms = await prisma.classroom.findMany({
    select: {
      id: true,
    },
    where: {
      students: {
        some: {
          id: session.user.id,
        },
      },
    },
  });

  const classroomIds = classrooms.map((c) => c.id);

  const problemsLists = await prisma.problemList.findMany({
    where: {
      classroom: {
        id: {
          in: classroomIds,
        },
      },
    },
    include: {
      problems: {
        include: { tags: true, students: { where: { id: session.user.id } } },
      },
      tags: true,
      classroom: true,
    },
  });

  return res.json(problemsLists);
}

export default apiHandler({
  GET: { handler: getMyProblemsLists, requiredRoles: "authenticated-user" },
});
