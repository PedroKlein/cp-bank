import type { NextApiRequest, NextApiResponse } from "next";
import createHttpError from "http-errors";
import { getSession } from "next-auth/react";
import prisma from "../../../../../lib/prisma";
import { apiHandler } from "../../../../../utils/api/api.handler";

async function getValidUsers(req: NextApiRequest, res: NextApiResponse) {
  const { id: classroomId } = req.query;
  const session = await getSession({ req });

  if (Array.isArray(classroomId)) throw new createHttpError.BadRequest();

  const users = await prisma.user.findMany({
    where: {
      id: { not: session.user.id },
      classrooms: { none: { id: classroomId } },
      pendingClassroomRequest: { none: { id: classroomId } },
    },
  });

  return res.json(users);
}

export default apiHandler({
  GET: { handler: getValidUsers },
});
