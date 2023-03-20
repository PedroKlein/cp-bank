import React from "react";
import useSWR from "swr";
import { Problem, User } from "@prisma/client";
import ContentModal from "./ContentModal";
import StudentItem, { ProblemStatus } from "../Classroom/StudentItem";
import { MdOutlineDone } from "react-icons/md";

type Props = {
  classroomId: string;
  problemId: string;
  isOpen: boolean;
  onClose: () => void;
};

const ProblemStatusModal: React.FC<Props> = ({
  isOpen,
  classroomId,
  problemId,
  onClose,
}) => {
  const { data: users } = useSWR<
    (User & {
      problemsSolved: Problem[];
    })[]
  >(`/api/classroom/${classroomId}/problem/${problemId}`);

  return (
    <ContentModal
      onClose={onClose}
      isOpen={isOpen}
      title="Students Problem Status"
    >
      <ul className="grid grid-cols-3 gap-4">
        {users?.map((user) => (
          <li key={user.id}>
            <StudentItem
              student={user}
              status={
                user.problemsSolved.length
                  ? ProblemStatus.DONE
                  : ProblemStatus.PENDING
              }
            />
          </li>
        ))}
      </ul>
    </ContentModal>
  );
};

export default ProblemStatusModal;
