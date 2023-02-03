import React, { useState } from "react";
import CreateClassroomModal from "../components/CreateClassroomModal/index";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Home: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { data: session, status } = useSession();

  if (status === "loading") return <main className="center" aria-busy />;

  if (status === "unauthenticated") {
    return (
      <main className="center">
        <section>
          <hgroup>
            <h2>{`Welcome to CP Bank!`}</h2>
            <h3>Please login</h3>
          </hgroup>

          <Link href="/api/auth/signin" role="button">
            Log in
          </Link>
        </section>
      </main>
    );
  }

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
