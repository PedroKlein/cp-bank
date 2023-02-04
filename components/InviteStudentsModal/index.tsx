import React, { useState } from "react";
import Modal from "../../layouts/Modal";
import axios from "axios";
import useSWR from "swr";
import { User } from "@prisma/client";
import user from "../../pages/api/user";
import { PostRequestStudentReq } from "../../pages/api/classroom/request/[id]";

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
    <Modal onClose={onClose} isOpen={isOpen} withoutAction={true}>
      <h3>Invite Students</h3>
      <form onSubmit={(e) => e.preventDefault()} style={{ marginBottom: 0 }}>
        <input
          type="search"
          id="search"
          name="search"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
        <ul>
          {users
            ?.filter((u) => u.name.toLowerCase().includes(search))
            .map((user) => (
              <li key={user.id}>
                <span>{user.name}</span>
                <a
                  style={{ float: "right" }}
                  onClick={() => sendInvite(user.id)}
                >
                  Invite
                </a>
              </li>
            ))}
        </ul>
      </form>
    </Modal>
  );
};

export default InviteStudentsModal;
