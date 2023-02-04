import { Classroom, Role } from "@prisma/client";
import Link from "next/link";
import React, { useState } from "react";
import useSWR from "swr";
import CreateClassroomModal from "../../components/CreateClassroomModal";
import { useSession } from "next-auth/react";

const Classroom: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { data: classrooms } = useSWR<Classroom[]>("/api/classroom/my");
  const { data: session, status } = useSession();

  if (status === "loading" || !classrooms)
    return <main className="center" aria-busy />;

  if (classrooms && classrooms.length === 0) {
    return (
      <main className="center">
        <hgroup>
          <h3>{`You aren't in any classroom yet!`}</h3>
          <h4>
            {`Plese check your `} <Link href={"/invite"}>invites</Link>
          </h4>
        </hgroup>
      </main>
    );
  }

  return (
    <main className="container">
      {session.user.role === Role.PROFESSOR && (
        <button className="contrast" onClick={() => setModalOpen(true)}>
          Create classroom
        </button>
      )}

      <h2>My classrooms</h2>
      <ul>
        {classrooms?.map((classroom) => (
          <li key={classroom.id}>
            <Link href={`/classroom/${classroom.id}`}>{classroom.name}</Link>
          </li>
        ))}
      </ul>
      {modalOpen && (
        <CreateClassroomModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      )}
    </main>
  );
};

export default Classroom;
