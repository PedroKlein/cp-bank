import axios from "axios";

interface ProblemId {
  contestId: number;
  index: string;
}

interface Problem {
  contestId: number;
  index: string;
  name: string;
  points?: number;
  rating?: number;
  tags: string[];
}

interface ApiResponse {
  status: string;
  result: { problems: Problem[] };
}

export async function getAllProblems(): Promise<Problem[]> {
  const { data: result } = await axios.get<ApiResponse>(
    `https://codeforces.com/api/problemset.problems`
  );

  return result.result.problems;
}

export async function getAllProblemTags(): Promise<string[]> {
  const { data: result } = await axios.get<ApiResponse>(
    `https://codeforces.com/api/problemset.problems`
  );

  //TODO: improve performace *remove reduce
  const tags = result.result.problems
    .map((p) => p.tags)
    .reduce((result, current) => result.concat(current), []);

  return Array.from(new Set(tags));
}

export function getMissingProblems(
  existingProblems: ProblemId[],
  allProblems: Problem[]
): Problem[] {
  const existingKeys = existingProblems.map(
    (problem) => `${problem.contestId}${problem.index}`
  );
  return allProblems.filter(
    (problem) => !existingKeys.includes(`${problem.contestId}${problem.index}`)
  );
}
