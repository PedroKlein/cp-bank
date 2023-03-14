import React, { useState } from "react";
import { ProblemListComplete } from "../../@types/problemList.types";
import ProblemItem from "../Problem/ProblemItem";
import ContentModal from "./ContentModal";
import { BsClipboardData } from "react-icons/bs";
import ProblemStatusModal from "./ProblemStatusModal";

type Props = {
  problemList: ProblemListComplete;
  isOpen: boolean;
  onClose: () => void;
};

const ProblemListModal: React.FC<Props> = ({
  problemList,
  isOpen,
  onClose,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
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
            {problemList.problems.map((p) => (
              <div key={p.id} className="flex flex-row gap-1 items-center">
                <button onClick={() => setModalIsOpen(true)}>
                  <BsClipboardData className="h-8 w-8" />
                </button>
                <div className="flex-grow">
                  <ProblemItem problem={p} />
                </div>
              </div>
            ))}
          </ul>
        </div>
      </form>
      {modalIsOpen && (
        <ProblemStatusModal
          isOpen={modalIsOpen}
          onClose={() => setModalIsOpen(false)}
        />
      )}
    </ContentModal>
  );
};

export default ProblemListModal;
