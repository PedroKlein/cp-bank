import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { apiHandler } from "../../../../utils/api/api.handler";

export type ApiProblem = {
  contestId: number;
  index: string;
  tags?: string[];
};

type ApiSubmission = {
  id: number;
  contestId: number;
  problem: ApiProblem;
  verdict: string;
};

type ApiResponse = {
  status: string;
  result: ApiSubmission[];
};

//TODO: refactor file locations
export async function getUserSolvedProblems(
  username: string
): Promise<ApiProblem[]> {
  const response = await axios.get<ApiResponse>(
    `https://codeforces.com/api/user.status?handle=${username}`
  );

  if (response.data.status !== "OK") {
    throw new Error(`Failed to fetch submissions: ${response.data.status}`);
  }

  const submissions = response.data.result.filter(
    (submission) => submission.verdict === "OK"
  );

  const apiProblems = submissions.map(
    (submission): ApiProblem => ({
      contestId: submission.contestId,
      index: submission.problem.index,
      tags: submission.problem.tags || [],
    })
  );

  return Array.from(new Set(apiProblems));
}

async function getSolved(
  req: NextApiRequest,
  res: NextApiResponse<ApiProblem[]>
) {
  const { username } = req.query;

  if (Array.isArray(username)) {
    throw new Error("Invalid array for username parameter");
  }

  const unsolvedProblems = await getUserSolvedProblems(username);

  return res.json(unsolvedProblems);
}

export default apiHandler({
  GET: { handler: getSolved },
});
