import type { NextApiRequest, NextApiResponse } from "next";
import createHttpError from "http-errors";
import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";
import { apiHandler } from "../../../utils/api/api.handler";
import { Role } from "@prisma/client";

export type PostAddStudentClassroomReq = {
  studentsId: string[];
  classroomId: string;
};

async function postInviteStudent(req: NextApiRequest, res: NextApiResponse) {
  const { studentsId, classroomId }: PostAddStudentClassroomReq = req.body;
  const session = await getSession({ req });

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
  await prisma.pendingClassroomRequest.createMany({
    data: studentsId.map((userId) => ({ userId, classroomId })),
  });

  res.json(classroom);
}

export default apiHandler({
  POST: { handler: postInviteStudent, requiredRoles: [Role.PROFESSOR] },
});
