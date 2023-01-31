import Link from "next/link";
import React, { useState } from "react";
import { MdNightlightRound, MdWbSunny } from "react-icons/md";
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
            <button
              id="theme-toggle"
              type="button"
              className={styles.themeToggleButton}
              data-theme-switcher="light"
            >
              <MdNightlightRound fill="black" id="theme-toggle-dark-icon" />
              <MdWbSunny fill="white" id="theme-toggle-light-icon" />
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
