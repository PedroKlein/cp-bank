import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import prisma from "../../../../lib/prisma";
import { apiHandler } from "../../../../utils/api/api.handler";

async function getMyInvites(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  const classrooms = await prisma.classroom.findMany({
    where: {
      pendingClassroomRequest: { some: { id: session.user.id } },
    },
    include: {
      professor: true,
    },
  });

  return res.json(classrooms);
}

export default apiHandler({
  GET: { handler: getMyInvites, requiredRoles: "authenticated-user" },
});
