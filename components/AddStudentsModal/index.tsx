import React, { useRef } from "react";
import Modal from "../../layouts/Modal";
import axios from "axios";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const AddStudentsModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const classroomNameRef = useRef<HTMLInputElement>(null);
  const classroomDescRef = useRef<HTMLTextAreaElement>(null);

  async function handleSubmit() {
    if (!classroomNameRef || !classroomDescRef) return;
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

export default AddStudentsModal;
