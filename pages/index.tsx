import React, { useState } from "react";
import CreateClassroomModal from "../components/CreateClassroomModal/index";
import { useSession } from "next-auth/react";
import Link from "next/link";
import getRandomEmoji from "../utils/randomEmoji.utils";

const Home: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { data: session, status } = useSession();

  if (status === "loading") return <main className="center" aria-busy />;

  if (status === "unauthenticated") {
    return (
      <main className="flex-1 bg-primary text-default">
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
    <main>
      <hgroup>
        <h2 className="text-default text-3xl">{`Welcome ${
          session.user.name
        } ${getRandomEmoji()}`}</h2>
        <h3 className="text-primary">Enjoy CP Bank </h3>
      </hgroup>
    </main>
  );
};

export default Home;
