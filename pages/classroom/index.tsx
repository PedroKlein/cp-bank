import { Classroom } from "@prisma/client";
import Link from "next/link";
import React from "react";
import useSWR from "swr";

const Classroom: React.FC = () => {
  const { data: classrooms } = useSWR<Classroom[]>("/api/classroom/my");

  return (
    <main className="container">
      <h2>My classrooms</h2>
      <ul>
        {classrooms?.map((classroom) => (
          <li key={classroom.id}>
            <Link href={`/classroom/${classroom.id}`}>{classroom.name}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Classroom;
