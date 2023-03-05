import { Classroom, User } from "@prisma/client";
import Link from "next/link";
import React from "react";

type Props = {
  classroom: Classroom & {
    professor: User;
  };
  isMy?: boolean;
};

const ClassroomItem: React.FC<Props> = ({ classroom, isMy }) => {
  return (
    <Link
      className="bg-primary max-w-xl p-2 rounded-lg"
      href={`/classroom/${classroom.id}`}
    >
      <li className="flex flex-col">
        <span>{classroom.name}</span>
        <span className="text-neutral">
          Professor: {isMy ? "(You)" : classroom.professor.name}
        </span>
      </li>
    </Link>
  );
};

export default ClassroomItem;
