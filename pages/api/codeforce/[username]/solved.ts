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

async function getUserSolvedProblems(
  req: NextApiRequest,
  res: NextApiResponse<ApiProblem[]>
) {
  const { username } = req.query;

  const response = await axios.get<ApiResponse>(
    `https://codeforces.com/api/user.status?handle=${username}`
  );

  if (response.data.status !== "OK") {
    throw new Error(`Failed to fetch submissions: ${response.data.status}`);
  }

  const submissions = response.data.result.filter(
    (submission) => submission.verdict === "OK"
  );

  return res.json(
    Array.from(
      new Set(
        submissions.map((submission) => ({
          contestId: submission.contestId,
          index: submission.problem.index,
          tags: submission.problem.tags || [],
        }))
      )
    )
  );
}

export default apiHandler({
  GET: { handler: getUserSolvedProblems },
});
