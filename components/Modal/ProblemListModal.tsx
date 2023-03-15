import React from "react";
import {
  ProblemListComplete,
  ProblemListCompleteWithStudents,
} from "../../@types/problemList.types";
import ContentModal from "./ContentModal";
import ProblemForProfessor from "../Problem/ProblemForProfessor";
import { Classroom } from "@prisma/client";
import ProblemForStudent from "../Problem/ProblemForStudent";

type Props = {
  problemList: ProblemListComplete | ProblemListCompleteWithStudents;
  classroom?: Classroom;
  isProfessor?: boolean;
  isOpen: boolean;
  onClose: () => void;
};

const ProblemListModal: React.FC<Props> = ({
  problemList,
  classroom,
  isProfessor = false,
  isOpen,
  onClose,
}) => {
  const tags = problemList.tags.map((t) => t.name).join(", ");

  return (
    <ContentModal onClose={onClose} isOpen={isOpen} title="Problem list">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="grid grid-cols-2 h-full gap-8"
      >
        <div className="flex flex-col gap-2 h-full">
          <h2>{problemList.name}</h2>
          <p>{problemList.description}</p>

          <span>tags: {tags}</span>
        </div>
        <div className="flex flex-col gap-2 h-full">
          <ul className="flex flex-col gap-2 w-full">
            {/* //TODO: fix any type on map */}
            {problemList.problems.map((p) =>
              isProfessor ? (
                <ProblemForProfessor
                  key={p.id}
                  problem={p}
                  classroomId={classroom?.id}
                />
              ) : (
                <ProblemForStudent key={p.id} problem={p} />
              )
            )}
          </ul>
        </div>
      </form>
    </ContentModal>
  );
};

export default ProblemListModal;
