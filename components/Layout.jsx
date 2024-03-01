"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Link from "next/link";
import { Avatar } from "@mui/material";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Layout({ children, name }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const router = useRouter();

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleLogout = () => {
    signOut();
    console.log("User logged out");
    setIsPopupOpen(false);
    router.push("/");
  };

  return (
    <div className="grid grid-cols-[70px_minmax(0,_1fr)] grid-rows-[90px_minmax(0,_1fr)] h-screen">
      <div className="col-start-1 col-end-2 row-start-1 row-end-3">
        <Sidebar />
      </div>

      <div className="col-start-2 col-end-3 row-start-1 row-end-2 flex justify-between items-center p-10">
        <div>
          <h2 className="text-3xl font-semibold">Hello {name}</h2>
          <p>Welcome to your dashboard</p>
        </div>

        <div onClick={togglePopup} className="relative">
          <Avatar>{name.slice(0, 2).toUpperCase()}</Avatar>
          {isPopupOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border-2 border-gray-200 p-2 rounded-md shadow-md">
              <Link href="/profile">
                <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Profile
                </a>
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

      {/* Main content area */}
      <div className="col-start-2 col-end-3 row-start-2 row-end-3 flex  p-10">
        {children}
      </div>
    </div>
  );
}
