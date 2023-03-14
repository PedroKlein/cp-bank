import { User } from "@prisma/client";
import React from "react";
import AvatarIcon from "../Generic/AvatarIcon";

export enum ProblemStatus {
  DONE = "DONE",
  PENDING = "PENDING",
}

type Props = {
  student: User;
  isMe?: boolean;
  status?: ProblemStatus;
};

const StudentItem: React.FC<Props> = ({ student, isMe, status }) => {
  const statusSyle = status
    ? `outline ${
        status === ProblemStatus.DONE
          ? "outline-green-500"
          : "outline-red-500"
      }`
    : "";

  return (
    <li className="flex flex-row items-center gap-2">
      <AvatarIcon
        className={`h-12 w-12 rounded-full ${statusSyle}`}
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
