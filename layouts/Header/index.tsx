import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import ThemeSwitch from "../../components/ThemeSwitch";
import Styles from "./header.module.scss";

const Header: React.FC = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  return (
    <header className="container" style={{ minHeight: "90px" }}>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <strong>CP Bank</strong>
            </Link>
          </li>
        </ul>

        <ul>
          {/* <li>
            <ThemeSwitch />
          </li> */}

          {session ? (
            <>
              <li>
                <Link data-active={isActive("/classroom")} href="/classroom">
                  My Classrooms
                </Link>
              </li>
              <li>
                <a style={{ cursor: "pointer" }} onClick={() => signOut()}>
                  Log out
                </a>
              </li>
              <li>
                <span style={{ marginRight: "10px" }}>{session.user.name}</span>
                <img
                  src={session.user.image}
                  alt=""
                  style={{ borderRadius: "50%", width: "50px" }}
                />
              </li>
            </>
          ) : (
            <li>
              <Link data-active={isActive("/signup")} href="/api/auth/signin">
                Log in
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
