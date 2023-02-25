import React, { useState } from "react";
import { motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Profile = () => {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      <motion.button
        className="flex items-center focus:outline-none"
        onClick={toggleDropdown}
        whileTap={{ scale: 0.95 }}
      >
        <span className="ml-2 font-medium pr-2 text-primary">
          {session?.user?.name}
        </span>
        <img
          className="w-12 h-12 rounded-full mx-auto"
          src={session?.user?.image}
        />
      </motion.button>
      {isOpen && (
        <motion.div
          className="absolute right-0 mt-1 py-2 w-48 bg-primary rounded-md shadow-xl z-20 divide-y divide-gray-100 dark:divide-gray-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <div className="px-4 py-3 text-sm flex flex-col text-primary">
            <span>{session?.user?.name}</span>
            <span className="font-medium truncate">{session?.user?.email}</span>
          </div>
          <ul
            className="py-2 text-sm text-primary"
            aria-labelledby="avatarButton"
          >
            <li>
              <Link
                href="/classroom"
                className="block px-4 py-2 hover:bg-secondary"
              >
                My classrooms
              </Link>
            </li>
            <li>
              <Link href="#" className="block px-4 py-2 hover:bg-secondary">
                Settings
              </Link>
            </li>
          </ul>
          <div className="py-1">
            <button
              className="block px-4 py-2 text-sm hover:bg-secondary w-full text-red-500 dark:text-red-400"
              onClick={() =>
                signOut({
                  callbackUrl: `${window.location.origin}`,
                })
              }
            >
              Sign out
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Profile;
