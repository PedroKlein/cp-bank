import { ProblemList, ProblemTag } from "@prisma/client";
import { ProblemWithTag } from "./problem.types";

export type ProblemListWithTags = ProblemList & {
  tags: ProblemTag[];
};

export type ProblemListComplete = ProblemList & {
  tags: ProblemTag[];
  problems: ProblemWithTag[];
};
