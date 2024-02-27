"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import src from "@/assets/logo.png";
import Image from "next/image";
import { useState } from "react";
import { Avatar } from "@mui/material";

export default function Navbar({ session }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleLogout = async () => {
    // Perform logout operation using NextAuth
    await signOut({ redirect: false });
    setIsPopupOpen(false);
  };

  console.log(session);

  return (
    <div>
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div className="flex items-center">
          <Image src={src} alt=" Logo" className="mr-10 h-12 w-12" />
          <ul className="flex">
            <li className="mr-10">
              <Link href="/">Home</Link>
            </li>
            <li className="mr-10">
              <Link href="/about">About</Link>
            </li>
            <li className="mr-10">
              <Link href="/courses">Courses</Link>
            </li>
            <li className="mr-10">
              <Link href="/wallet">Wallet</Link>
            </li>
            <li className="mr-10">
              <Link href="/contact-us">Contact Us</Link>
            </li>
          </ul>
        </div>

        {/* Search and Register */}
        {session ? (
          <div className="relative flex items-center">
            <div onClick={togglePopup} className="cursor-pointer">
              {/* Assuming 'session.user.name' exists and holds the full name */}
              <Avatar>{session.user.name.slice(0, 2).toUpperCase()}</Avatar>
              {isPopupOpen && (
                <div className="absolute right-0 mt-2 bg-white border-2 border-gray-200 p-2 rounded-md shadow-md">
                  {/* Add any additional options here */}
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center">
            <Link
              href="/auth/signup"
              className="ml-4 bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition duration-300"
            >
              Register
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
}
