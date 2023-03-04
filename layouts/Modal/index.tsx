import React, { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";

export type ModalProps = {
  isOpen: boolean;
  children: React.ReactNode | React.ReactNode[];
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const containerRef = useRef(null);
  useOnClickOutside(containerRef, onClose);

  const backdropVariants = {
    visible: { opacity: 0.7 },
    hidden: { opacity: 0 },
  };

  const modalVariants = {
    hidden: { opacity: 0, y: "-50%" },
    visible: { opacity: 1, y: "0%" },
    exit: { opacity: 0, y: "-50%" },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed top-0 left-0 w-full h-full bg-black z-50"
            variants={backdropVariants}
            animate="visible"
            initial="hidden"
            exit="hidden"
          />
          <div
            className="fixed top-0 left-0 w-full h-full transparent flex items-center justify-center z-50"
            onClick={() => onClose()}
          >
            <motion.div
              className="bg-default rounded-lg p-2 max-w-[50vw] max-h-[80vh] w-full mx-4 overflow-auto"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="absolute top-0 right-0 p-4" onClick={onClose}>
                <svg
                  className="h-6 w-6 text-gray-700"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {children}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
