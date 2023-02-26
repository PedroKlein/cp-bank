import React, { useState } from "react";
import { FiBell } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import { Classroom, User } from "@prisma/client";
import { PutAcceptDeclineRequestReq } from "../../../pages/api/classroom/request/[id]";
import axios from "axios";
import useSWR from "swr";

interface Notification {
  id: number;
  title: string;
  message: string;
}

const Notification: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: invites, mutate } = useSWR<
    (Classroom & {
      professor: User;
    })[]
  >("/api/classroom/request/my");

  async function sendResponse(classroomId: string, hasAccepted: boolean) {
    mutate((classrooms) => classrooms.filter((u) => u.id !== classroomId), {
      revalidate: false,
    });
    const body: PutAcceptDeclineRequestReq = {
      hasAccepted,
    };
    await axios.put(`/api/classroom/request/${classroomId}`, body);
  }

  return (
    <div className="relative inline-block">
      <button
        className="flex items-center justify-center rounded-full text-default"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FiBell size={22} />
        {invites?.length > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
            {invites.length}
          </span>
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute right-0 w-64 mt-2 origin-top-right bg-neutral divide-y divide-gray-200 rounded-md shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {invites?.length > 0 ? (
              invites.map((invite) => (
                <div key={invite.id} className="px-4 py-3">
                  <p className="text-sm font-bold text-default">
                    Classroom: {invite.name}
                  </p>
                  <p className="text-sm text-default">
                    Professor: {invite.professor.name}
                  </p>
                  <div className="mt-2 flex justify-end space-x-2">
                    <button
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md"
                      onClick={() => sendResponse(invite.id, true)}
                    >
                      Accept
                    </button>
                    <button
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md"
                      onClick={() => sendResponse(invite.id, false)}
                    >
                      Decline
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-4 py-3">
                <span>{`you don't have any classroom invites`}</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Notification;
