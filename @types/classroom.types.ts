import { Classroom, ProblemList, User } from "@prisma/client";
import { ProblemListWithTags } from "./problemList.types";

export type CompleteClassroom = Classroom & {
  students: User[];
  professor: User;
  ProblemList: ProblemListWithTags[];
};
