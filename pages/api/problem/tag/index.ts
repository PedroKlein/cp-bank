import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { apiHandler } from "../../../../utils/api/api.handler";

async function getAllTags(req: NextApiRequest, res: NextApiResponse) {
  const tags = await prisma.problemTag.findMany();

  return res.json(tags);
}

export default apiHandler({
  GET: { handler: getAllTags, requiredRoles: "authenticated-user" },
});
