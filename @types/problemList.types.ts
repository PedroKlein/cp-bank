import { Classroom, ProblemList, ProblemTag, User } from "@prisma/client";
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
  students: User[];
};

export type ProblemListCompleteWithClassroom = ProblemListComplete & {
  classroom: Classroom;
};
