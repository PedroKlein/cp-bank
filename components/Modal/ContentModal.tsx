import React from "react";
import Modal, { ModalProps } from "../../layouts/Modal";

export type ContentModalProps = {
  title: string;
} & ModalProps;

const ContentModal: React.FC<ContentModalProps> = ({
  title,
  isOpen,
  children,
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
    </Modal>
  );
};

export default ContentModal;
