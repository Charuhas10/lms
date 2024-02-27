import { signOut } from "next-auth/react";
import Link from "next/link";
import { FaFacebook, FaGithub } from "react-icons/fa";

export default function Navbar() {
  return (
    <div className="relative z-10">
      <section className="py-5 text-white">
        <div className="container mx-auto flex justify-between">
          <div>
            <h1 className="text-4xl font-bold">Application</h1>
            <span>ONLINE EDUCATION AND LEARNING</span>
          </div>
          <div className="flex">
            <FaFacebook className="w-10 h-10 rounded-full text-center bg-white bg-opacity-30 transition duration-500 ease-in-out ml-2.5 hover:bg-[#1eb2a6] hover:text-white cursor-pointer" />
            <FaGithub className="w-10 h-10 rounded-full text-center bg-white bg-opacity-30 transition duration-500 ease-in-out ml-2.5 hover:bg-[#1eb2a6] hover:text-white cursor-pointer" />
          </div>
        </div>
      </section>

      <header className="bg-white bg-opacity-20 mx-7">
        <nav className="flex justify-between">
          <ul className="flex py-7 px-5">
            <li className="mr-10">
              <Link href="/">HOME</Link>
            </li>
            <li className="mr-10">
              <Link href="/courses">COURSES</Link>
            </li>
            <li className="mr-10">
              <Link href="/about">ABOUT</Link>
            </li>
            <li className="mr-10">
              <Link href="/wallet">WALLET</Link>
            </li>
            <li className="mr-10">
              <Link href="/mycourses">MY COURSES</Link>
            </li>
            <li className="mr-10">
              <Link href="/profile">PROFILE</Link>
            </li>
            <li className="mr-10">
              <button
                onClick={() => {
                  signOut();
                }}
              >
                LOGOUT
              </button>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}
