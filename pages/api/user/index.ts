import type { NextApiRequest, NextApiResponse } from "next";
import createHttpError from "http-errors";
import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";
import { apiHandler } from "../../../utils/api/api.handler";

async function getUsers(req: NextApiRequest, res: NextApiResponse) {
  const { search } = req.query;
  const session = await getSession({ req });

  if (Array.isArray(search)) throw new createHttpError.BadRequest();

  const users = await prisma.user.findMany({
    where: {
      id: { not: session.user.id },
      name: { contains: search, mode: "insensitive" },
    },
  });

  res.json(users);
}

export default apiHandler({
  GET: { handler: getUsers },
});
