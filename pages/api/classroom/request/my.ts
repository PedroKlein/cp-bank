import type { NextApiRequest, NextApiResponse } from "next";
import createHttpError from "http-errors";
import { getSession } from "next-auth/react";

import { Classroom, Role } from "@prisma/client";
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

  res.json(classrooms);
}

export default apiHandler({
  GET: { handler: getMyInvites },
});
function useSWR<T>(arg0: string): { data: any } {
  throw new Error("Function not implemented.");
}
