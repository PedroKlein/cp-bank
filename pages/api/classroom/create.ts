import type { NextApiRequest, NextApiResponse } from "next";
import createHttpError from "http-errors";
import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";
import { apiHandler } from "../../../utils/api/api.handler";
import { Role } from "@prisma/client";

export type PostCreateClassroomReq = {
  name: string;
  description: string;
};

async function postCreateClassroom(req: NextApiRequest, res: NextApiResponse) {
  const { name, description }: PostCreateClassroomReq = req.body;
  const session = await getSession({ req });
  const classroom = await prisma.classroom.create({
    data: { name, description, professorId: session.user.id },
  });

  res.json(classroom);
}

export default apiHandler({
  POST: { handler: postCreateClassroom, requiredRoles: [Role.PROFESSOR] },
});
