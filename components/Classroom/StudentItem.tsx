import { Classroom, User } from "@prisma/client";
import Link from "next/link";
import React from "react";
import AvatarIcon from "../Generic/AvatarIcon";

type Props = {
  student: User;
  isMe?: boolean;
};

const StudentItem: React.FC<Props> = ({ student, isMe }) => {
  return (
    <li className="flex flex-row items-center gap-2">
      <AvatarIcon
        className="h-12 w-12"
        userName={student.name}
        imageUrl={student.image}
      />
      <div className="flex flex-col">
        <span className="text-default">
          {`${student.name}${isMe ? " (you)" : ""}`}
        </span>
        <span className="text-neutral text-sm">{`(${student.cfUsername})`}</span>
      </div>
    </li>
  );
};

export default StudentItem;
