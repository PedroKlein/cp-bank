import React from "react";
import useSWR from "swr";
import ContentModal from "./ContentModal";

type Props = {
  problemListId: string;
  isOpen: boolean;
  onClose: () => void;
};

const ProblemListModal: React.FC<Props> = ({
  problemListId,
  isOpen,
  onClose,
}) => {
  const { data: problemList } = useSWR(`/api/`);
  return (
    <ContentModal
      onClose={onClose}
      isOpen={isOpen}
      title="Create a problem list"
    >
      <form
        onSubmit={(e) => e.preventDefault()}
        className="grid grid-cols-2 h-full gap-8"
      >
        <div className="flex flex-col gap-2 h-full">
          <h2>{}</h2>

          <p>{}</p>

          <span>{}</span>
        </div>
        <div className="flex flex-col gap-2 h-full">
          {/* <ProblemListPaginated
            selectedTags={selectedTags}
            selectedProblems={selectedProblems}
            onSelect={handleProblemsChange}
          /> */}
        </div>
      </form>
    </ContentModal>
  );
};

export default ProblemListModal;
