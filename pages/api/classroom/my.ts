import type { NextApiRequest, NextApiResponse } from "next";
import createHttpError from "http-errors";
import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";
import { apiHandler } from "../../../utils/api/api.handler";
import { Role } from "@prisma/client";

async function getMyCLassrooms(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  const classrooms = await prisma.classroom.findMany({
    where: {
      professorId: session.user.id,
    },
    include: {
      professor: true,
    },
  });

  res.json(classrooms);
}

export default apiHandler({
  GET: { handler: getMyCLassrooms, requiredRoles: [Role.PROFESSOR] },
});
