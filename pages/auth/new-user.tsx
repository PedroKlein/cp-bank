import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import { PostNewUserReq } from "../api/user/new";

// import { Container } from './styles';

const FirstLogin: React.FC = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const cfUserRef = useRef<HTMLInputElement>(null);
  const isProfessorRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
      return;
    }
  }, [router]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!cfUserRef || !isProfessorRef) {
      return;
    }

    const body: PostNewUserReq = {
      cfUsername: cfUserRef.current.value,
      isProfessor: isProfessorRef.current.checked,
    };

    await axios.post("/api/user/new", body);

    router.push("/");
  }

  if (!session) return;

  return (
    <main className="container">
      <div>
        <hgroup>
          <h1>{`Hello, ${session.user.name} ✌️`}</h1>
          <h2>Welcome to CP-Bank</h2>
        </hgroup>
      </div>
      <div>
        <h2>Please fill in your informations</h2>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <label htmlFor="cfUser">
              Codeforces username
              <input
                type="text"
                id="cfUser"
                name="cfUser"
                placeholder="Codeforces username"
                ref={cfUserRef}
                required
              />
            </label>

            <label htmlFor="isProfessor">
              <input
                type="checkbox"
                id="isProfessor"
                name="isProfessor"
                ref={isProfessorRef}
              />
              I'am a professor
            </label>
          </fieldset>
          <small>
            <mark>Attention!</mark> You won't be able to edit this informations!
          </small>
          <button type="submit">Submit</button>
        </form>
      </div>
    </main>
  );
};

export default FirstLogin;
