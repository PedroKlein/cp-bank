import Link from "next/link";
import React, { useState } from "react";
import { MdNightlightRound, MdWbSunny } from "react-icons/md";
import ThemeSwitch from "../../components/ThemeSwitch";
import styles from "./header.module.scss";

const Header: React.FC = () => {
  return (
    <header className="container">
      <nav>
        <ul>
          <li>
            <Link href="/">
              <strong>CP Bank</strong>
            </Link>
          </li>
        </ul>

        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <ThemeSwitch />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
