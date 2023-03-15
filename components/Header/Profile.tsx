import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { useCallback } from "react";
import AvatarIcon from "../Generic/AvatarIcon";

const Profile = () => {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const closeDropDown = useCallback(() => setIsOpen(false), [setIsOpen]);
  useOnClickOutside(containerRef, closeDropDown);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative" ref={containerRef}>
      <motion.button
        className="flex items-center focus:outline-none"
        onClick={toggleDropdown}
        whileTap={{ scale: 0.95 }}
      >
        <span className="ml-2 font-medium pr-2 text-default">
          {session?.user?.name}
        </span>
        <AvatarIcon
          className="w-12 h-12"
          imageUrl={session?.user?.image}
          userName={session?.user?.name}
        />
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
                <Link href="/list" className="block px-4 py-2 hover:bg-primary">
                  My lists
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
