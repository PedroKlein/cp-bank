import type { NextApiRequest, NextApiResponse } from "next";
import { apiHandler } from "../../../../utils/api/api.handler";
import { getAllProblemTags } from "../../../../services/codeforces.service";
import prisma from "../../../../lib/prisma";
import { HttpStatusCode } from "axios";

async function createCodeforcesTags(req: NextApiRequest, res: NextApiResponse) {
  const tags = await getAllProblemTags();

  await prisma.problemTag.createMany({
    data: tags.map((t) => ({
      name: t,
    })),
    skipDuplicates: true,
  });

  return res.status(HttpStatusCode.Created).end();
}

export default apiHandler({
  POST: { handler: createCodeforcesTags },
});
