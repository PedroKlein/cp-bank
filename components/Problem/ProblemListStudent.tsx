import React from "react";
import useSWR from "swr";
import { ProblemListCompleteWithStudents } from "../../@types/problemList.types";
import ProblemListItem from "../Classroom/ProblemListItem";

type Props = {
  classroomId: string;
};

const ProblemListStudent: React.FC<Props> = ({ classroomId }) => {
  const { data: problemLists } = useSWR<ProblemListCompleteWithStudents[]>(
    `/api/classroom/${classroomId}/list/my`
  );

  return (
    <ul className="flex flex-col gap-2">
      {problemLists?.map((list) => (
        <ProblemListItem key={list.id} problemList={list} isProfessor={false} />
      ))}
    </ul>
  );
};

export default ProblemListStudent;
