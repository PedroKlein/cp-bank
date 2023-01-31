import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { MdNightlightRound, MdWbSunny } from "react-icons/md";
import ThemeSwitch from "../../components/ThemeSwitch";
import styles from "./header.module.scss";

const Header: React.FC = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

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
          {session ? (
            <li>
              <a onClick={() => signOut()}>Log out</a>
            </li>
          ) : (
            <li>
              <Link data-active={isActive("/signup")} href="/api/auth/signin">
                Log in
              </Link>
            </li>
          )}

          <li>
            <ThemeSwitch />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
