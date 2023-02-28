import { Classroom, User } from "@prisma/client";
import { useRouter } from "next/router";
import React, { useState } from "react";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import InviteStudentsModal from "../../components/Modal/InviteStudentsModal";

const ClassroomPage: React.FC = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const { data: session, status } = useSession();
  const { id: classroomId } = router.query;
  const { data: classroom } = useSWR<
    Classroom & {
      students: User[];
      professor: User;
    }
  >(`/api/classroom/${classroomId}`);

  if (status === "loading" || !classroom)
    return <main aria-busy className="center" />;

  return (
    <main className="container">
      <hgroup>
        <h2>Classroom: {classroom?.name}</h2>
        <h3>Professor: {classroom?.professor.name}</h3>
      </hgroup>

      <p>
        <b>description: </b>
        {classroom?.description}
      </p>

      {session?.user?.id === classroom?.professorId && (
        <button onClick={() => setModalOpen(true)}>Invite Students</button>
      )}

      <small>List of students:</small>
      <ul>
        {classroom?.students.map((student) => (
          <li key={student.id}>{`${student.name}${
            student.id === session.user.id ? " (you)" : ""
          }`}</li>
        ))}
      </ul>
      {modalOpen && (
        <InviteStudentsModal
          classroomId={classroom.id}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      )}
    </main>
  );
};

export default ClassroomPage;
