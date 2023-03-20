import React, { useState } from "react";
import { BsClipboardData } from "react-icons/bs";
import { ProblemWithTag } from "../../@types/problem.types";
import ProblemStatusModal from "../Modal/ProblemStatusModal";
import ProblemItem from "./ProblemItem";

type Props = {
  problem: ProblemWithTag;
  classroomId: string;
};

const ProblemForProfessor: React.FC<Props> = ({ problem, classroomId }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <div className="flex flex-row gap-1 items-center">
      <button onClick={() => setModalIsOpen(true)}>
        <BsClipboardData className="h-8 w-8" />
      </button>
      <div className="flex-grow">
        <ProblemItem problem={problem} />
      </div>
      {modalIsOpen && (
        <ProblemStatusModal
          classroomId={classroomId}
          problemId={problem.id}
          isOpen={modalIsOpen}
          onClose={() => setModalIsOpen(false)}
        />
      )}
    </div>
  );
};

export default ProblemForProfessor;
