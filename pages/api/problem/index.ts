import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { apiHandler } from "../../../utils/api/api.handler";
import { paginateList } from "../../../utils/api/paginate.utils";

async function getProblems(req: NextApiRequest, res: NextApiResponse) {
  const { tags, page = 1, pageSize = 10 } = req.query;

  const tagsArray = !Array.isArray(tags) ? [tags] : tags;

  const pageNumber = parseInt(page as string, 10);
  const pageSizeNumber = parseInt(pageSize as string, 10);
  if (
    isNaN(pageNumber) ||
    isNaN(pageSizeNumber) ||
    pageNumber < 1 ||
    pageSizeNumber < 1
  ) {
    throw new Error("Invalid query params");
  }

  const whereQuery = {
    tags: {
      some: { name: { in: tagsArray } },
    },
  };

  const [problems, total] = await prisma.$transaction([
    prisma.problem.findMany({
      skip: pageSizeNumber * (pageNumber - 1),
      take: pageSizeNumber,
      where: whereQuery,
      include: {
        tags: true,
      },
    }),
    prisma.problem.count({
      where: whereQuery,
    }),
  ]);

  const paginatedProblems = paginateList(
    problems,
    pageNumber,
    pageSizeNumber,
    total
  );

  return res.json(paginatedProblems);
}

export default apiHandler({
  GET: { handler: getProblems, requiredRoles: "authenticated-user" },
});
