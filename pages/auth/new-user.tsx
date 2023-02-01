import { Role } from "@prisma/client";
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
  const isStudentRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
      return;
    }
  }, [router]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!cfUserRef || !isStudentRef) {
      return;
    }

    const body: PostNewUserReq = {
      cfUsername: cfUserRef.current.value,
      role: isStudentRef.current.checked ? Role.STUDENT : Role.PROFESSOR,
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
        <hgroup>
          <h3>Please fill in your informations</h3>
          <small>
            <mark>Attention!</mark> You won't be able to edit these
            informations!
          </small>
        </hgroup>

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
            <fieldset className="grid">
              <legend>Type of user</legend>
              <label htmlFor="isStudent">
                <input
                  type="radio"
                  id="isStudent"
                  name="userRole"
                  ref={isStudentRef}
                  value={Role.STUDENT}
                  checked
                />
                I'am a student
              </label>
              <label htmlFor="isProfessor">
                <input
                  type="radio"
                  id="isProfessor"
                  name="userRole"
                  value={Role.PROFESSOR}
                />
                I'am a professor
              </label>
            </fieldset>
          </fieldset>

          <button type="submit">Submit</button>
        </form>
      </div>
    </main>
  );
};

export default FirstLogin;
