import type { NextApiRequest, NextApiResponse } from "next";
import createHttpError from "http-errors";
import { getSession } from "next-auth/react";
import prisma from "../../../../lib/prisma";
import { apiHandler } from "../../../../utils/api/api.handler";
import { Role } from "@prisma/client";

async function postAcceptInvite(req: NextApiRequest, res: NextApiResponse) {
  const { id: classroomId } = req.query;
  const session = await getSession({ req });

  if (Array.isArray(classroomId)) throw new createHttpError.BadRequest();

  const classroomRequest = await prisma.pendingClassroomRequest.findFirst({
    where: { classroomId, userId: session.user.id },
  });

  if (classroomRequest) throw new createHttpError.BadRequest();

  // await prisma.classroom.create({
  //   data: crea,
  // });

  // res.json(classroom);
}

export default apiHandler({
  POST: {
    handler: postAcceptInvite,
    requiredRoles: [Role.STUDENT, Role.PROFESSOR],
  },
});
