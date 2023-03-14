import { ProblemList } from "@prisma/client";
import React, { useState } from "react";
import { ProblemListWithTags } from "../../@types/problemList.types";
import { MdDateRange } from "react-icons/md";
import dayjs from "dayjs";
import ProblemListModal from "../Modal/ProblemListModal";

type Props = {
  problemList: ProblemListWithTags;
  classroomName?: string;
};

const ProblemListItem: React.FC<Props> = ({ problemList, classroomName }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const tags = problemList.tags.map((t) => t.name).join(", ");
  const submissionDate = dayjs(problemList.submissionDate).format("DD/MM");
  const isLate = dayjs(problemList.submissionDate).isBefore(new Date());
  return (
    <>
      <div className="flex flex-row w-full p-2 bg-primary rounded-lg text-default justify-between">
        <div className="flex flex-col">
          <h3>{`${problemList.name}${
            classroomName ? " (" + classroomName + ")" : ""
          }`}</h3>
          <span>tags: {tags}</span>
        </div>
        <div className={`flex items-center ${isLate && "text-red-400"}`}>
          <span>{submissionDate}</span>
          <MdDateRange className="h-8 w-8 " />
        </div>
      </div>
      {modalIsOpen && (
        <ProblemListModal
          problemListId={problemList.id}
          isOpen={modalIsOpen}
          onClose={() => setModalIsOpen(false)}
        />
      )}
    </>
  );
};

export default ProblemListItem;
