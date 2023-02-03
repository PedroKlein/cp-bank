import type { NextApiRequest, NextApiResponse } from "next";
import createHttpError from "http-errors";
import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";
import { apiHandler } from "../../../utils/api/api.handler";
import { Role } from "@prisma/client";

//TODO: check if is a student in the classroom or its professor
async function getClassroom(req: NextApiRequest, res: NextApiResponse) {
  const { id: classroomId } = req.query;

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

async function deleteClassroom(req: NextApiRequest, res: NextApiResponse) {
  const { id: classroomId } = req.query;
  const session = await getSession({ req });

  if (Array.isArray(classroomId)) throw new createHttpError.BadRequest();

  const classroom = await prisma.classroom.findFirst({
    where: { id: classroomId },
  });

  if (classroom?.professorId !== session.user.id) {
    throw new createHttpError.Unauthorized();
  }

  if (classroom.isActive) {
    await prisma.classroom.update({
      where: {
        id: classroomId,
      },
      data: {
        isActive: false,
      },
    });
  } else {
    await prisma.classroom.delete({
      where: {
        id: classroomId,
      },
    });
  }
}

export default apiHandler({
  GET: {
    handler: getClassroom,
    requiredRoles: [Role.STUDENT, Role.PROFESSOR],
  },
  DELETE: {
    handler: deleteClassroom,
    requiredRoles: [Role.PROFESSOR],
  },
});
