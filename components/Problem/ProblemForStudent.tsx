import React from "react";
import { MdVerified } from "react-icons/md";
import { ProblemComplete, ProblemWithTag } from "../../@types/problem.types";
import ProblemItem from "./ProblemItem";

type Props = {
  problem: ProblemComplete;
};

const ProblemForStudent: React.FC<Props> = ({ problem }) => {
  const isDone = problem.students.length > 0;

  function submitProblemDone() {}

  return (
    <div className="flex flex-row gap-2 items-center">
      {isDone ? (
        <MdVerified className="h-8 w-8 text-green-500" />
      ) : (
        <button
          className="p-1 bg-red-500 rounded-lg"
          onClick={submitProblemDone}
        >
          update
        </button>
      )}
      <div
        className={`flex-grow rounded-lg border ${
          isDone ? "border-green-500" : "border-red-500"
        }`}
      >
        <ProblemItem problem={problem} />
      </div>
    </div>
  );
};

export default ProblemForStudent;
