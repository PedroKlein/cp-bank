import React from "react";
import { FaGithub } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 z-20 w-full bg-primary">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-12 items-center">
          <a
            href="http://www.ufrgs.br/ufrgs/inicial"
            target="_blank"
            rel="noopener noreferrer"
            className="text-default"
          >
            @ufrgs
          </a>
          <a
            href="https://github.com/PedroKlein/cp-bank"
            target="_blank"
            rel="noopener noreferrer"
            className="text-default"
          >
            <FaGithub size={24} />
          </a>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
