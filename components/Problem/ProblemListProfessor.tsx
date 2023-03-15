import React from "react";
import useSWR from "swr";
import { ProblemListComplete } from "../../@types/problemList.types";
import ProblemListItem from "../Classroom/ProblemListItem";

type Props = {
  classroomId: string;
};

const ProblemListProfessor: React.FC<Props> = ({ classroomId }) => {
  const { data: problemLists } = useSWR<ProblemListComplete[]>(
    `/api/classroom/${classroomId}/list`
  );
  return (
    <ul className="flex flex-col gap-2">
      {problemLists?.map((list) => (
        <ProblemListItem key={list.id} problemList={list} isProfessor={true} />
      ))}
    </ul>
  );
};

export default ProblemListProfessor;
