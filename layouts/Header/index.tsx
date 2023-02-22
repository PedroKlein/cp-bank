import React from "react";
import Profile from "../../components/Header/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FaBars } from "react-icons/fa";
import Link from "next/link";

const Header: React.FC = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const unauthenticatedOptions = (
    <div className="hidden sm:ml-6 sm:flex sm:items-center">
      <button className="text-gray-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
        <Link href="/api/auth/signin">Log in</Link>
      </button>
    </div>
  );

  const authenticatedOptions = (
    <div className="hidden sm:ml-6 sm:flex sm:items-center">
      <Profile />
    </div>
  );
  return (
    <header className="bg-gray-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <h1>CP Bank</h1>
          </div>
          {status === "unauthenticated"
            ? unauthenticatedOptions
            : authenticatedOptions}
          {/* <div className="-mr-2 flex items-center sm:hidden">
            <button className="text-gray-400 hover:text-white px-4 py-2">
              <FaBars />
            </button>
          </div> */}
        </div>
      </nav>
    </header>
  );
};

export default Header;
