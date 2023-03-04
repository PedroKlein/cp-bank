import { Classroom, Role, User } from "@prisma/client";
import Link from "next/link";
import React, { useState } from "react";
import useSWR from "swr";
import CreateClassroomModal from "../../components/Modal/CreateClassroomModal";
import { useSession } from "next-auth/react";
import ClassroomItem from "../../components/Classroom/ClassroomItem";

const Classroom: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { data: classrooms } = useSWR<
    (Classroom & {
      professor: User;
    })[]
  >("/api/classroom/my");
  const { data: session, status } = useSession();

  if (status === "loading" || !classrooms) return <main aria-busy />;

  if (classrooms && classrooms.length === 0) {
    return (
      <main>
        <hgroup>
          <h2>{`You aren't in any classroom yet!`}</h2>
          <h3>
            {`Plese check your `} <Link href={"/invite"}>invites</Link>
          </h3>
        </hgroup>
      </main>
    );
  }

  return (
    <main>
      <section className="flex flex-col gap-4">
        <div className="flex justify-between">
          <h1>My classrooms</h1>
          {session.user.role === Role.PROFESSOR && (
            <button
              className="button-fill bg-primary"
              onClick={() => setModalOpen(true)}
            >
              Create classroom
            </button>
          )}
        </div>

        <ul className="flex flex-col gap-2">
          {classrooms?.map((classroom) => (
            <ClassroomItem
              key={classroom.id}
              classroom={classroom}
              isMy={classroom.professorId === session.user.id}
            />
          ))}
        </ul>
      </section>

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
