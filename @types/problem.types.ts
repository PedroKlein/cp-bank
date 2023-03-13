import { Problem, ProblemTag } from "@prisma/client";

export type ProblemWithTag = Problem & {
  tags: ProblemTag[];
};
