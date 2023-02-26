import React from "react";
import Profile from "../../components/Header/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import Notification from "../../components/Header/Notification";

const Header: React.FC = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const unauthenticatedOptions = (
    <div className="hidden sm:ml-6 sm:flex sm:items-center">
      <button className="text-default hover:text-secondary px-3 py-2 rounded-md text-sm font-medium">
        <Link href="/api/auth/signin">Log in</Link>
      </button>
    </div>
  );

  const authenticatedOptions = (
    <div className="hidden sm:ml-6 sm:flex sm:items-center gap-1">
      <Notification />
      <Profile />
    </div>
  );
  return (
    <header className="bg-primary">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center font-bold text-lg">
            <Link href="/" className="text-secondary">
              CP Bank
            </Link>
          </div>
          {status !== "authenticated"
            ? unauthenticatedOptions
            : authenticatedOptions}
        </div>
      </nav>
    </header>
  );
};

export default Header;
