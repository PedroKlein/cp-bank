import React, { useState } from "react";
import CreateClassroomModal from "../components/CreateClassroomModal/index";
import { useSession } from "next-auth/react";

const Home: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { data: session, status } = useSession();

  return (
    <main className="container">
      <section>
        <h2>{`Welcome ${session?.user?.name}`}</h2>
        <button className="contrast" onClick={() => setModalOpen(true)}>
          Create classroom
        </button>
        <CreateClassroomModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      </section>
    </main>
  );
};

export default Home;
