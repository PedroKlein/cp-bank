import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import getRandomEmoji from "../utils/randomEmoji.utils";

const Home: React.FC = () => {
  const { data: session, status } = useSession();

  if (status === "loading") return <main className="center" aria-busy />;

  if (status === "unauthenticated") {
    return (
      <main className="justify-center items-center">
        <section>
          <h1>{`Welcome to CP Bank!`}</h1>
          <h3 className="text-primary">Please login</h3>
        </section>

        <Link
          href="/api/auth/signin"
          className="bg-primary p-4 mt-1 rounded-lg text-secondary hover:scale-110 transition-all"
          role="button"
        >
          Log in
        </Link>
      </main>
    );
  }

  return (
    <main className="justify-center items-center gap-4">
      <section>
        <h1>{`Welcome ${session.user.name} ${getRandomEmoji()}`}</h1>
        <h3 className="text-primary">Enjoy CP Bank </h3>
      </section>

      <div className="flex flex-row gap-4">
        <Link href="/list">
          <button className="button-fill bg-primary">My lists</button>
        </Link>
        <Link href="/classroom">
          <button className="button-fill bg-primary">My classrooms</button>
        </Link>
      </div>
    </main>
  );
};

export default Home;
