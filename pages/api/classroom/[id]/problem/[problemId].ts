import type { NextApiRequest, NextApiResponse } from "next";
import createHttpError from "http-errors";

import { Role } from "@prisma/client";
import prisma from "../../../../../lib/prisma";
import { apiHandler } from "../../../../../utils/api/api.handler";

async function getStudentsStatus(req: NextApiRequest, res: NextApiResponse) {
  const { id: classroomId, problemId } = req.query;

  if (Array.isArray(classroomId) || Array.isArray(problemId)) {
    throw new createHttpError.BadRequest();
  }

  const students = await prisma.user.findMany({
    where: { classrooms: { some: { id: classroomId } } },
    include: {
      problemsSolved: {
        where: {
          id: problemId,
        },
      },
    },
  });

  console.log(students, classroomId, problemId);

  return res.json(students);
}

export default apiHandler({
  GET: {
    handler: getStudentsStatus,
    requiredRoles: [Role.PROFESSOR],
  },
});
