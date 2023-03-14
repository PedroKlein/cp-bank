import { Problem, ProblemList, ProblemTag } from "@prisma/client";

export type ProblemListWithTags = ProblemList & {
  tags: ProblemTag[];
};

export type ProblemListComplete = ProblemList & {
  tags: ProblemTag[];
  problems: Problem[];
};
