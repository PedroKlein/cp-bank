import type { NextApiRequest, NextApiResponse } from "next";
import createHttpError from "http-errors";
import { getSession } from "next-auth/react";
import prisma from "../../../../lib/prisma";
import { apiHandler } from "../../../../utils/api/api.handler";
import { Role } from "@prisma/client";
import { HttpStatusCode } from "axios";

export type PostRequestStudentReq = {
  studentId: string;
};

async function postRequestStudent(req: NextApiRequest, res: NextApiResponse) {
  const { id: classroomId } = req.query;
  const { studentId }: PostRequestStudentReq = req.body;
  const session = await getSession({ req });

  if (Array.isArray(classroomId)) throw new createHttpError.BadRequest();

  const classroom = await prisma.classroom.findFirst({
    where: { id: classroomId },
    include: {
      students: true,
    },
  });

  if (classroom.professorId !== session.user.id) {
    throw new createHttpError.Unauthorized();
  }

  //TODO: remove students already in classroom
  await prisma.classroom.update({
    where: { id: classroomId },
    data: {
      pendingClassroomRequest: {
        connect: { id: studentId },
      },
    },
  });

  return res.json(classroom);
}

export type PutAcceptDeclineRequestReq = {
  hasAccepted: boolean;
};

async function putAcceptDeclineRequest(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id: classroomId } = req.query;
  const { hasAccepted }: PutAcceptDeclineRequestReq = req.body;
  const session = await getSession({ req });

  if (Array.isArray(classroomId)) throw new createHttpError.BadRequest();

  const classroomRequest = await prisma.classroom.update({
    where: {
      id: classroomId,
    },
    data: {
      pendingClassroomRequest: {
        disconnect: {
          id: session.user.id,
        },
      },
    },
  });

  if (!hasAccepted) return;

  await prisma.classroom.update({
    where: { id: classroomId },
    data: {
      students: {
        connect: {
          id: session.user.id,
        },
      },
    },
  });

  return res.status(HttpStatusCode.Ok);
}

export default apiHandler({
  POST: { handler: postRequestStudent, requiredRoles: [Role.PROFESSOR] },
  PUT: {
    handler: putAcceptDeclineRequest,
    requiredRoles: [Role.STUDENT, Role.PROFESSOR],
  },
});
