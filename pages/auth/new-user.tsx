import { Role } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import { PatchNewUserReq } from "../api/user/new";

const FirstLogin: React.FC = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const cfUserRef = useRef<HTMLInputElement>(null);
  const isStudentRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [router]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!cfUserRef || !isStudentRef) {
      return;
    }

    const body: PatchNewUserReq = {
      cfUsername: cfUserRef.current.value,
      role: isStudentRef.current.checked ? Role.STUDENT : Role.PROFESSOR,
    };

    await axios.patch("/api/user/new", body);

    router.push("/");
  }

  if (!session) return;

  return (
    <main>
      <div className="flex flex-col gap-2">
        <h1>{`Hello, ${session.user.name} ✌️`}</h1>
        <h2>Welcome to CP-Bank</h2>
      </div>
      <div className="flex flex-col justify-center h-full">
        <div className="w-[50%] flex flex-col gap-4">
          <div>
            <h3>Please fill in your informations</h3>
            <small>
              <mark>Attention!</mark> You won't be able to edit these
              informations!
            </small>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div className="input-container">
              <label htmlFor="cfUser">Codeforces username</label>
              <input
                type="text"
                id="cfUser"
                name="cfUser"
                placeholder="Codeforces username"
                ref={cfUserRef}
                required
              />
            </div>

            <legend>Type of user</legend>
            <div className="flex flex-row gap-4">
              <div className="flex items-center mb-4">
                <input
                  type="radio"
                  id="isStudent"
                  name="userRole"
                  ref={isStudentRef}
                  value={Role.STUDENT}
                  checked
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="isStudent"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  I'am a student
                </label>
              </div>

              <div className="flex items-center mb-4">
                <input
                  type="radio"
                  id="isProfessor"
                  name="userRole"
                  value={Role.PROFESSOR}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="isProfessor"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  I'am a professor
                </label>
              </div>
            </div>

            <button type="submit" className="button-fill bg-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default FirstLogin;
