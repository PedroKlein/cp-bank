import React, { useState } from "react";
import Modal from "../../layouts/Modal";
import axios from "axios";
import useSWR from "swr";
import { User } from "@prisma/client";
import user from "../../pages/api/user";
import { PostRequestStudentReq } from "../../pages/api/classroom/request/[id]";
import ContentModal from "./ContentModal";
import StudentItem from "../Classroom/StudentItem";

type Props = {
  classroomId: string;
  isOpen: boolean;
  onClose: () => void;
};

const InviteStudentsModal: React.FC<Props> = ({
  isOpen,
  classroomId,
  onClose,
}) => {
  const [search, setSearch] = useState("");
  const { data: users, mutate } = useSWR<User[]>(
    `/api/classroom/request/valid-users/${classroomId}`
  );

  async function sendInvite(studentId: string) {
    mutate((users) => users.filter((u) => u.id !== studentId), {
      revalidate: false,
    });
    const body: PostRequestStudentReq = {
      studentId,
    };
    await axios.post(`/api/classroom/request/${classroomId}`, body);
  }

  return (
    <ContentModal onClose={onClose} isOpen={isOpen} title="Invite Students">
      <input
        type="search"
        id="search"
        name="search"
        placeholder="Search"
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />
      <ul className="flex flex-col gap-1">
        {users
          ?.filter((u) => u.name.toLowerCase().includes(search))
          .map((user) => (
            <li key={user.id} className="flex flex-row justify-between">
              <StudentItem student={user} />
              <button
                className="button-fill bg-primary"
                onClick={() => sendInvite(user.id)}
              >
                Invite
              </button>
            </li>
          ))}
      </ul>
    </ContentModal>
  );
};

export default InviteStudentsModal;
