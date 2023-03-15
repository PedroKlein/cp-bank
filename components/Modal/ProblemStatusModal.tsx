import React from "react";
import useSWR from "swr";
import { User } from "@prisma/client";
import ContentModal from "./ContentModal";
import StudentItem, { ProblemStatus } from "../Classroom/StudentItem";
import { MdOutlineDone } from "react-icons/md";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const ProblemStatusModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { data: users } = useSWR<User[]>(
    `/api/classroom/request/valid-users/cldq3mecl0002l308275vcthu`
  );

  return (
    <ContentModal
      onClose={onClose}
      isOpen={isOpen}
      title="Students Problem Status"
    >
      <ul className="grid grid-cols-3 gap-4">
        {users?.map((user) => (
          <li key={user.id}>
            {/* //TODO: use problem status */}
            <StudentItem student={user} status={ProblemStatus.DONE} />
          </li>
        ))}
      </ul>
    </ContentModal>
  );
};

export default ProblemStatusModal;
