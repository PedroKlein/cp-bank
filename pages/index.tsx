import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import getRandomEmoji from "../utils/randomEmoji.utils";

const Home: React.FC = () => {
  const { data: session, status } = useSession();

  if (status === "loading") return <main className="center" aria-busy />;

  if (status === "unauthenticated") {
    return (
      <main className="flex-1 bg-default text-default">
        <hgroup>
          <h2 className="text-3xl">{`Welcome to CP Bank!`}</h2>
          <h3>Please login</h3>
        </hgroup>

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
