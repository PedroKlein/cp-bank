import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  getAllProblems,
  getMissingProblems,
} from "../../../../services/codeforces.service";
import prisma from "../../../../lib/prisma";
import { HttpStatusCode } from "axios";
import { apiHandler } from "../../../../utils/api/api.handler";

async function createProblems(req: NextApiRequest, res: NextApiResponse) {
  const problems = await getAllProblems();

  const dbProblems = await prisma.problem.findMany({
    select: { contestId: true, index: true },
  });

  const missingProblems = getMissingProblems(dbProblems, problems);

  missingProblems.forEach(async (p) => {
    await prisma.problem.create({
      data: { ...p, tags: { connect: p.tags.map((t) => ({ name: t })) } },
    });
  });

  return res.status(HttpStatusCode.Ok).end();
}

export default apiHandler({
  POST: { handler: createProblems },
});
