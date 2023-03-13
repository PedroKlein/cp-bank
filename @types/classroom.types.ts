import { Classroom, ProblemList, User } from "@prisma/client";

export type CompleteClassroom = Classroom & {
  students: User[];
  professor: User;
  ProblemList: ProblemList[];
};
