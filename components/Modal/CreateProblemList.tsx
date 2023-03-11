import React, { useRef, useState } from "react";
import axios from "axios";
import Datepicker from "react-tailwindcss-datepicker";
import { PostCreateClassroomReq } from "../../pages/api/classroom";
import ActionModal from "./ActionModal";
import { subtractDays } from "../../utils/date.utils";
import TagInput from "../Generic/TagInput";
import useSWR from "swr";
import ProblemListPaginated from "../Classroom/ProblemListPaginated";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const CreateProblemList: React.FC<Props> = ({ isOpen, onClose }) => {
  const classroomNameRef = useRef<HTMLInputElement>(null);
  const classroomDescRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });
  const { data: tags } = useSWR<string[]>(`/api/problem/tag`);

  const handleTagsChange = (tags: string[]) => {
    setSelectedTags(tags);
  };

  const handleValueChange = (newValue) => {
    setValue(newValue);
  };

  async function handleSubmit() {
    if (!classroomNameRef || !classroomDescRef) return;

    const body: PostCreateClassroomReq = {
      name: classroomNameRef.current.value,
      description: classroomDescRef.current.value,
    };

    await axios.post("/api/classroom", body);

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
              placeholder="Classroom name"
              maxLength={100}
              ref={classroomNameRef}
              required
            />
          </div>

          <div className="input-container flex-grow">
            <label htmlFor="desc">Description</label>
            <textarea
              className="h-full"
              id="desc"
              name="desc"
              placeholder="Classroom description"
              ref={classroomDescRef}
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
              value={value}
              onChange={handleValueChange}
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
          <ProblemListPaginated selectedTags={selectedTags} />
        </div>
      </form>
    </ActionModal>
  );
};

export default CreateProblemList;
