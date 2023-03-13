import { Problem, ProblemTag } from "@prisma/client";
import React from "react";

type Props = {
  problem: Problem & {
    tags: ProblemTag[];
  };
};

const ProblemItem: React.FC<Props> = ({ problem }) => {
  const link = `https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`;
  const tags = problem.tags.map((t) => t.name).join(", ");
  return (
    <li>
      <a
        className="flex flex-col rounded-lg w-full p-2 bg-primary text-default"
        href={link}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>{problem.name}</span>
        <span className="text-gray-400 text-xs">{tags}</span>
      </a>
    </li>
  );
};

export default ProblemItem;
