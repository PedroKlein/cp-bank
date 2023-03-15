import { Classroom, ProblemList, ProblemTag } from "@prisma/client";
import { ProblemComplete, ProblemWithTag } from "./problem.types";

export type ProblemListWithTags = ProblemList & {
  tags: ProblemTag[];
};

export type ProblemListComplete = ProblemList & {
  tags: ProblemTag[];
  problems: ProblemWithTag[];
};

export type ProblemListCompleteWithStudents = ProblemList & {
  tags: ProblemTag[];
  problems: ProblemComplete[];
};

export type ProblemListCompleteWithClassroom = ProblemListComplete & {
  classroom: Classroom;
};
