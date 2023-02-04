import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";
import { apiHandler } from "../../../utils/api/api.handler";
import { Role } from "@prisma/client";

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

  return res.json(classrooms);
}

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

  return res.json(classroom);
}

export default apiHandler({
  GET: { handler: getCLassrooms, requiredRoles: "authenticated-user" },
  POST: { handler: postCreateClassroom, requiredRoles: [Role.PROFESSOR] },
});
