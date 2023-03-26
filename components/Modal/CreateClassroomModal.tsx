import React, { useRef } from "react";
import axios from "axios";
import { PostCreateClassroomReq } from "../../pages/api/classroom";
import ActionModal from "./ActionModal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const CreateClassroomModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const classroomNameRef = useRef<HTMLInputElement>(null);
  const classroomDescRef = useRef<HTMLTextAreaElement>(null);

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
      title="Create your classroom!"
      actions={
        <>
          <button className="button-outline outline-primary" onClick={onClose}>
            Cancel
          </button>
          <button className="button-fill bg-primary" onClick={handleSubmit}>
            Create classroom
          </button>
        </>
      }
    >
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col gap-4 w-96"
      >
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

        <div className="input-container">
          <label htmlFor="desc">Description</label>
          <textarea
            id="desc"
            name="desc"
            placeholder="Classroom description"
            maxLength={300}
            ref={classroomDescRef}
            required
          />
        </div>
      </form>
    </ActionModal>
  );
};

export default CreateClassroomModal;
