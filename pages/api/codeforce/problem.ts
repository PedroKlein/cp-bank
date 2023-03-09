import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { apiHandler } from "../../../utils/api/api.handler";
import { Paginated, paginateList } from "../../../utils/api/paginate.utils";

interface Problem {
  contestId: number;
  index: string;
  name: string;
  tags: string[];
}

interface ApiResponse {
  status: string;
  result: { problems: Problem[] };
}

async function getProblems(
  req: NextApiRequest,
  res: NextApiResponse<Paginated<Problem>>
) {
  //TODO: check for valid parameters
  const { tags, page = 1, pageSize = 10 } = req.query;

  if (isNaN(+page) || isNaN(+pageSize) || page < 1 || pageSize < 1) {
    throw new Error("Invalid page or pageSize parameter");
  }

  const searchTags = !Array.isArray(tags) ? [tags] : tags;

  const { data: result } = await axios.get<ApiResponse>(
    `https://codeforces.com/api/problemset.problems?tags=${searchTags.join(
      ";"
    )}`
  );

  if (result.status !== "OK") {
    throw new Error(`Failed to fetch problems: ${result.status}`);
  }

  const formattedResult = result.result.problems.map((problem) => ({
    contestId: problem.contestId,
    index: problem.index,
    name: problem.name,
    tags: problem.tags,
  }));

  return res.json(paginateList(formattedResult, +page, +pageSize));
}

export default apiHandler({
  GET: { handler: getProblems },
});
