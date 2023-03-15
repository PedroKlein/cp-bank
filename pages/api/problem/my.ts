import type { NextApiRequest, NextApiResponse } from "next";
import createHttpError from "http-errors";
import { getSession } from "next-auth/react";
import { apiHandler } from "../../../utils/api/api.handler";
import prisma from "../../../lib/prisma";
import { Problem } from ".prisma/client";

async function getMySolvedProblems(
  req: NextApiRequest,
  res: NextApiResponse<Problem[]>
) {}

export default apiHandler({
  GET: { handler: getMySolvedProblems, requiredRoles: "authenticated-user" },
});
