import { Classroom, User } from "@prisma/client";
import { ProblemListComplete } from "./problemList.types";

export type CompleteClassroom = Classroom & {
  students: User[];
  professor: User;
  ProblemList: ProblemListComplete[];
};
