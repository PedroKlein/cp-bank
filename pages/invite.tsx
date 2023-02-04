import { Classroom, User } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import React from "react";
import useSWR from "swr";
import { PutAcceptDeclineRequestReq } from "./api/classroom/request/[id]";

const InvitesPage: React.FC = () => {
  const { data: session, status } = useSession();

  const { data: classrooms, mutate } = useSWR<
    (Classroom & {
      professor: User;
    })[]
  >("/api/classroom/request/my");

  async function sendResponse(classroomId: string, hasAccepted: boolean) {
    mutate((classrooms) => classrooms.filter((u) => u.id !== classroomId), {
      revalidate: false,
    });
    const body: PutAcceptDeclineRequestReq = {
      hasAccepted,
    };
    await axios.put(`/api/classroom/request/${classroomId}`, body);
  }

  if (status === "loading" || !classrooms)
    return <main className="center" aria-busy />;

  if (classrooms && classrooms.length === 0) {
    return (
      <main className="center">
        <h3>{`Looks like you don't have any classroom invites`}</h3>
      </main>
    );
  }

  return (
    <main className="container">
      <h2>My Invites</h2>
      <ul>
        {classrooms?.map((classroom) => (
          <li key={classroom.id} className="grid">
            <span>{`Classroom: ${classroom.name}`}</span>
            <small>{`Professor: ${classroom.professor.name}`}</small>
            <div>
              <a href="#" onClick={() => sendResponse(classroom.id, true)}>
                Accept
              </a>
            </div>
            <div>
              <a href="#" onClick={() => sendResponse(classroom.id, false)}>
                Decline
              </a>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default InvitesPage;
