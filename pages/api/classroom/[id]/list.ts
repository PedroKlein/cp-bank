import type { NextApiRequest, NextApiResponse } from "next";
import createHttpError from "http-errors";

import { Role } from "@prisma/client";
import { HttpStatusCode } from "axios";
import prisma from "../../../../lib/prisma";
import { apiHandler } from "../../../../utils/api/api.handler";

export type PostCreateProblemListReq = {
  name: string;
  description: string;
  releaseDate: Date;
  submissionDate: Date;
  tags: string[];
  problemsId: string[];
};

async function getProblemLists(req: NextApiRequest, res: NextApiResponse) {
  const { id: classroomId } = req.query;

  if (Array.isArray(classroomId)) throw new createHttpError.BadRequest();

  const problemLists = await prisma.problemList.findMany({
    where: { classroomId: classroomId },
    include: {
      tags: true,
      problems: true,
    },
  });

  return res.json(problemLists);
}

async function createProblemList(req: NextApiRequest, res: NextApiResponse) {
  const { id: classroomId } = req.query;

  const {
    name,
    description,
    releaseDate,
    submissionDate,
    tags,
    problemsId,
  }: PostCreateProblemListReq = req.body;

  if (Array.isArray(classroomId)) throw new createHttpError.BadRequest();

  await prisma.classroom.update({
    where: { id: classroomId },
    data: {
      ProblemList: {
        create: {
          name,
          description,
          releaseDate: new Date(releaseDate),
          submissionDate: new Date(submissionDate),
          tags: {
            connect: tags.map((t) => ({ name: t })),
          },
          problems: {
            connect: problemsId.map((p) => ({ id: p })),
          },
        },
      },
    },
  });

  return res.status(HttpStatusCode.Created).end();
}

export default apiHandler({
  GET: {
    handler: getProblemLists,
  },
  POST: {
    handler: createProblemList,
    requiredRoles: [Role.PROFESSOR],
  },
});
