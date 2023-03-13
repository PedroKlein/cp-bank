import React, { useRef, useState } from "react";
import axios from "axios";
import Datepicker from "react-tailwindcss-datepicker";
import { PostCreateClassroomReq } from "../../pages/api/classroom";
import ActionModal from "./ActionModal";
import { subtractDays } from "../../utils/date.utils";
import TagInput from "../Generic/TagInput";
import useSWR from "swr";
import ProblemListPaginated from "../Classroom/ProblemListPaginated";
import { ProblemWithTag } from "../../@types/problem.types";
import { PostCreateProblemListReq } from "../../pages/api/classroom/[id]/list";

type CalendarRange = {
  startDate: Date;
  endDate: Date;
};

type Props = {
  classroomId: string;
  isOpen: boolean;
  onClose: () => void;
};

const CreateProblemList: React.FC<Props> = ({
  classroomId,
  isOpen,
  onClose,
}) => {
  const listNameRef = useRef<HTMLInputElement>(null);
  const listDescRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedProblems, setSelectedProblems] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<CalendarRange>({
    startDate: null,
    endDate: null,
  });
  const { data: tags } = useSWR<string[]>(`/api/problem/tag`);

  function handleTagsChange(tags: string[]) {
    setSelectedTags(tags);
  }

  function handleDateRangeChange(newValue) {
    setDateRange(newValue);
  }

  function handleProblemsChange(problemId: string) {
    const isSelected = selectedProblems.includes(problemId);
    if (isSelected) {
      setSelectedProblems((old) => old.filter((p) => p !== problemId));
    } else {
      setSelectedProblems((old) => [...old, problemId]);
    }
  }

  async function handleSubmit() {
    if (!listNameRef || !listDescRef) return;

    const body: PostCreateProblemListReq = {
      name: listNameRef.current.value,
      description: listDescRef.current.value,
      releaseDate: dateRange.startDate,
      submissionDate: dateRange.endDate,
      tags: selectedTags,
      problemsId: selectedProblems,
    };

    await axios.post(`/api/classroom/${classroomId}/list`, body);

    onClose();
  }

  return (
    <ActionModal
      onClose={onClose}
      isOpen={isOpen}
      title="Create a problem list"
      actions={
        <>
          <button className="button-outline outline-primary" onClick={onClose}>
            Cancel
          </button>
          <button className="button-fill bg-primary" onClick={handleSubmit}>
            Create List
          </button>
        </>
      }
    >
      <form
        onSubmit={(e) => e.preventDefault()}
        className="grid grid-cols-2 h-full gap-8"
      >
        <div className="flex flex-col gap-2 h-full">
          <div className="input-container">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="List name"
              maxLength={100}
              ref={listNameRef}
              required
            />
          </div>

          <div className="input-container flex-grow">
            <label htmlFor="desc">Description</label>
            <textarea
              className="h-full"
              id="desc"
              name="desc"
              placeholder="List description"
              ref={listDescRef}
              required
            />
          </div>

          <div className="input-container">
            <label htmlFor="date">Submit date range</label>
            <Datepicker
              id="date"
              name="date"
              placeholder="select the day of release and limit day to submit"
              useRange={false}
              minDate={subtractDays(new Date(), 1)}
              value={dateRange}
              onChange={handleDateRangeChange}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 h-full">
          {tags && (
            <div className="input-container">
              <label htmlFor="tags">Select the tags for the list</label>
              <TagInput
                suggestions={tags}
                selectedTags={selectedTags}
                onChange={handleTagsChange}
              />
            </div>
          )}
          <ProblemListPaginated
            selectedTags={selectedTags}
            selectedProblems={selectedProblems}
            onSelect={handleProblemsChange}
          />
        </div>
      </form>
    </ActionModal>
  );
};

export default CreateProblemList;
