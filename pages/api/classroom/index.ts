import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";
import { apiHandler } from "../../../utils/api/api.handler";

async function getCLassrooms(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  const classrooms = await prisma.classroom.findMany({
    where: {
      students: {
        some: {
          id: session.user.id,
        },
      },
    },
    include: {
      professor: true,
    },
  });

  res.json(classrooms);
}

export default apiHandler({
  GET: { handler: getCLassrooms, requiredRoles: "authenticated-user" },
});
