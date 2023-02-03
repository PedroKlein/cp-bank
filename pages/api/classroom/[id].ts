import type { NextApiRequest, NextApiResponse } from "next";
import createHttpError from "http-errors";
import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";
import { apiHandler } from "../../../utils/api/api.handler";
import { Role } from "@prisma/client";

//TODO: check if is a student in the classroom or its professor
async function getClassroom(req: NextApiRequest, res: NextApiResponse) {
  const { id: classroomId } = req.query;
  const session = await getSession({ req });

  if (Array.isArray(classroomId)) throw new createHttpError.BadRequest();

  const classroom = await prisma.classroom.findFirst({
    where: { id: classroomId },
    include: {
      students: true,
      professor: true,
    },
  });

  res.json(classroom);
}

export default apiHandler({
  GET: {
    handler: getClassroom,
    requiredRoles: [Role.STUDENT, Role.PROFESSOR],
  },
});
