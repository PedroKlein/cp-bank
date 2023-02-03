import React, { useRef } from "react";
import Modal from "../../layouts/Modal";
import axios from "axios";
import { PostCreateClassroomReq } from "../../pages/api/classroom/create";

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
    console.log(body);

    await axios.post("/api/classroom/create", body);
  }

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      onPositive={handleSubmit}
      positiveButtonText="Create Classroom"
      positiveButtonLoadingText="Creating Classroom..."
    >
      <h3>Create your classroom!</h3>
      <form onSubmit={(e) => e.preventDefault()} style={{ marginBottom: 0 }}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Classroom name"
          ref={classroomNameRef}
          required
        />
        <label htmlFor="desc">Description</label>
        <textarea
          id="desc"
          name="desc"
          placeholder="Classroom description"
          ref={classroomDescRef}
          required
        />
      </form>
    </Modal>
  );
};

export default CreateClassroomModal;
