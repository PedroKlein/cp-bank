import { useRouter } from "next/router";
import React, { useState } from "react";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import InviteStudentsModal from "../../components/Modal/InviteStudentsModal";
import StudentItem from "../../components/Classroom/StudentItem";
import CreateProblemList from "../../components/Modal/CreateProblemList";
import { CompleteClassroom } from "../../@types/classroom.types";
import ProblemListProfessor from "../../components/Problem/ProblemListProfessor";
import ProblemListStudent from "../../components/Problem/ProblemListStudent";

const ClassroomPage: React.FC = () => {
  const router = useRouter();
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [listModalOpen, setListmodalOpen] = useState(false);
  const { data: session, status } = useSession();
  const { id: classroomId } = router.query;
  const { data: classroom } = useSWR<CompleteClassroom>(
    `/api/classroom/${classroomId}`
  );

  const isProfessor = classroom?.professor.id === session?.user?.id;

  if (status === "loading" || !classroom)
    return <main aria-busy className="center" />;

  return (
    <main>
      <section className="flex flex-col gap-4">
        <div className="flex justify-between">
          <hgroup>
            <h1>{classroom.name}</h1>
            <h3>Professor: {classroom?.professor.name}</h3>
          </hgroup>

          {isProfessor && (
            <div className="flex flex-row gap-2">
              <button
                className="button-fill bg-primary"
                onClick={() => setInviteModalOpen(true)}
              >
                Invite Students
              </button>
              <button
                className="button-fill bg-primary"
                onClick={() => setListmodalOpen(true)}
              >
                Create Problem List
              </button>
            </div>
          )}
        </div>

        <p>
          <b>description: </b>
          {classroom?.description}
        </p>
        <div className="grid grid-cols-2 h-full gap-8">
          <div className="flex flex-col gap-2">
            <span>{`Students (${classroom?.students.length})`}</span>
            <ul className="flex flex-row gap-2">
              {classroom?.students.map((student) => (
                <StudentItem student={student} key={student.id} />
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <span>{`Lists (${classroom?.ProblemList.length})`}</span>
            {isProfessor ? (
              <ProblemListProfessor classroomId={classroom?.id} />
            ) : (
              <ProblemListStudent classroomId={classroom?.id} />
            )}
          </div>
        </div>
      </section>

      {inviteModalOpen && (
        <InviteStudentsModal
          classroomId={classroom.id}
          isOpen={inviteModalOpen}
          onClose={() => setInviteModalOpen(false)}
        />
      )}

      {listModalOpen && (
        <CreateProblemList
          classroomId={classroom.id}
          isOpen={listModalOpen}
          onClose={() => setListmodalOpen(false)}
        />
      )}
    </main>
  );
};

export default ClassroomPage;
