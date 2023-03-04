import React from "react";
import Modal, { ModalProps } from "../../layouts/Modal";
import { title } from "process";

export type ActionModalProps = {
  title: string;
  actions: React.ReactNode | React.ReactNode[];
} & ModalProps;

const ActionModal: React.FC<ActionModalProps> = ({
  title,
  isOpen,
  children,
  actions,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <header className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
        <h3 className="text-xl font-semibold text-default dark:text-white">
          {title}
        </h3>
      </header>
      <div className="p-6 space-y-6 text-default">{children}</div>
      <footer className="flex items-center justify-evenly pt-3 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
        {actions}
      </footer>
    </Modal>
  );
};

export default ActionModal;
