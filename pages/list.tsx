import React from "react";
import useSWR from "swr";
import { ProblemListCompleteWithClassroom } from "../@types/problemList.types";
import ProblemListItem from "../components/Classroom/ProblemListItem";

const ListsPage: React.FC = () => {
  const { data: problemLists } =
    useSWR<ProblemListCompleteWithClassroom[]>(`/api/problem/list/my`);
  return (
    <main>
      <div className="flex flex-col gap-4">
        <h1>{`My Lists (${problemLists?.length})`}</h1>
        <ul className="grid grid-cols-3 gap-4">
          {problemLists?.map((list) => (
            <ProblemListItem
              key={list.id}
              problemList={list}
              classroomName={list.classroom.name}
            />
          ))}
        </ul>
      </div>
    </main>
  );
};

export default ListsPage;
