import React, { useState } from "react";
import Modal from "../components/modal/index";

const Home: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <main className="container">
      <button className="contrast" onClick={() => setModalOpen(true)}>
        Open Modal
      </button>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
};

export default Home;
