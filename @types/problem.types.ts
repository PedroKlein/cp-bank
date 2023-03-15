import { Problem, ProblemTag, User } from "@prisma/client";

export type ProblemWithTag = Problem & {
  tags: ProblemTag[];
};

export type ProblemComplete = Problem & {
  tags: ProblemTag[];
  students: User[];
};
