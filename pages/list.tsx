import React from "react";
import useSWR from "swr";
import { ProblemListCompleteWithClassroom } from "../@types/problemList.types";
import ProblemListItem from "../components/Classroom/ProblemListItem";
import Loader from "../components/Loader";

const ListsPage: React.FC = () => {
  const { data: problemLists } =
    useSWR<ProblemListCompleteWithClassroom[]>(`/api/problem/list/my`);

  if (!problemLists)
    return (
      <main className="justify-center items-center">
        <Loader />
      </main>
    );

  if (problemLists.length === 0) {
    return (
      <main className="justify-center items-center">
        <hgroup>
          <h2>{`You don't have any lists yet!`}</h2>
        </hgroup>
      </main>
    );
  }

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
