import { Classroom } from "@prisma/client";
import React from "react";
import useSWR from "swr";
// import { Container } from './styles';

const Classroom: React.FC = () => {
  const { data } = useSWR<Classroom[]>("/api/user");

  return (
    <main className="container">
      <h1>My classrooms</h1>
    </main>
  );
};

export default Classroom;
