import React from "react";
import { FaTwitter, FaGithub } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="container-fluid">
      <nav>
        <ul>
          <li><a href="http://www.ufrgs.br/ufrgs/inicial">
              @ufrgs
            </a></li>
        </ul>
        <ul>
          <li>
            <a href="https://github.com/PedroKlein/cp-bank">
              <FaGithub />
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
