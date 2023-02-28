import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import getNameInitials from "../../utils/nameInitials.utils";

const Profile = () => {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      <motion.button
        className="flex items-center focus:outline-none"
        onClick={toggleDropdown}
        whileTap={{ scale: 0.95 }}
      >
        <span className="ml-2 font-medium pr-2 text-default">
          {session?.user?.name}
        </span>
        {session?.user?.image && !imageError ? (
          <img
            onError={() => setImageError(true)}
            className="w-12 h-12 rounded-full mx-auto"
            src={session?.user?.image}
          />
        ) : (
          <div className="bg-neutral w-12 h-12 rounded-full flex justify-center items-center text-default text-xl">
            <span>{getNameInitials(session?.user?.name)}</span>
          </div>
        )}
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute right-0 mt-1 py-2 w-48 bg-neutral rounded-md shadow-xl z-20 divide-y divide-gray-300 dark:divide-gray-600"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-4 py-3 text-sm flex flex-col text-default">
              <span>{session?.user?.name}</span>
              <span className="font-medium truncate">
                {session?.user?.email}
              </span>
            </div>
            <ul
              className="py-2 text-sm text-default"
              aria-labelledby="avatarButton"
            >
              <li>
                <Link
                  href="/classroom"
                  className="block px-4 py-2 hover:bg-primary"
                >
                  My classrooms
                </Link>
              </li>
              <li>
                <Link href="#" className="block px-4 py-2 hover:bg-primary">
                  Settings
                </Link>
              </li>
            </ul>
            <div className="py-1">
              <button
                className="block px-4 py-2 text-sm hover:bg-primary w-full text-red-500 dark:text-red-400"
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
      </AnimatePresence>
    </div>
  );
};

export default Profile;
