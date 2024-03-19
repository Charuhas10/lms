"use client";
// app/courses/[id]/page.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Avatar } from "@mui/material";
import Image from "next/image";
import { signOut } from "next-auth/react";
import Link from "next/link";
import impressions from "@/assets/impressions.png";
import { addCourse, getUser } from "@/utils/api";
import { useRouter } from "next/navigation";

export default function CoursePage({ id, email, name }) {
  const [course, setCourse] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [user, setUser] = useState(null);

  const router = useRouter();

  useEffect(() => {
    // Fetch course details based on `id`
    const fetchCourse = async () => {
      const userRes = await getUser(email);
      setUser(userRes);

      const response = await fetch(`/api/getCourses/${id}`);
      const data = await response.json();
      setCourse(data.course);
    };

    if (id) {
      fetchCourse();
    }
  }, [id, email]);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleLogout = () => {
    signOut();
    console.log("User logged out");
    setIsPopupOpen(false);
    router.push("/");
  };

  if (!course) {
    return <p>Loading...</p>;
  }

  const add = () => {
    console.log(email);
    try {
      // const user = await getUser(email);
      if (user.trialActivated) {
        console.log(user);

        // Check if course is free or if user has enough credits
        if (course.isFree || user.credits >= credits) {
          if (!course.isFree) {
            user.credits -= credits; // Assuming 'credits' is the cost of the course
          }

          const remainingCredits = user.credits;

          const updatedUser = addCourse(user._id, id, remainingCredits);

          if (updatedUser) router.push("/mycourses");
        } else {
          // Handle not enough credits
          alert("You do not have enough credits to purchase this course");
        }
      } else {
        // Handle userResponse not OK
        console.log("Failed to fetch user details");
      }
    } catch (error) {
      console.error("An unexpected error happened:", error);
    }
  };

  console.log(course);

  return (
    <div className="grid grid-cols-[70px_1fr] grid-rows-[90px_1fr] gap-0">
      <div className="col-start-1 col-end-2 row-start-1 row-end-3">
        <Sidebar />
      </div>

      <div className="col-start-2 col-end-3 row-start-1 row-end-2 flex justify-between p-10">
        <div>
          {/* <h2>Hello {name}</h2>
          <p>Welcome to your dashboard</p> */}
          <h1>
            <span className=" text-orange-300">Available:</span> {user.credits}
          </h1>
        </div>

        <div onClick={togglePopup} className="cursor-pointer">
          <Avatar>{name.slice(0, 2).toUpperCase()}</Avatar>
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

      <div className="col-start-2 col-end-3 row-start-2 row-end-3 p-10">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
          <div>
            <h2 className="text-6xl font-bold text-[#0093c2] mb-6">
              {course.courseName}
            </h2>
            <p className="mb-4"> CREDITS Needed: {course.credits}</p>
            <button
              onClick={add}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded transition duration-300 ease-in-out mb-4"
            >
              Add to wallet
            </button>
            <p className="text-lg">Benefits: Get a Certificate</p>
          </div>
          <div className="flex-shrink-0">
            <Image
              src={course.cover}
              alt={course.courseName}
              width={300}
              height={300}
            />
          </div>
        </div>

        <div className="flex gap-20">
          <div className="flex-shrink-0">
            {/* Placeholder for your badge image */}
            <Image
              src={impressions}
              alt="Skill Badge"
              width={300}
              height={300}
            />
          </div>
          <div className="flex-grow">
            <h2 className="text-4xl font-bold mb-2">About Course</h2>
            <h3 className="text-xl mb-4">
              Journey to Cloud: Envisioning Your Solution
            </h3>
            <p className="mb-4 w-[80%]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque et euismod ligula. Morbi mattis pretium eros, non
              ultricies urna rhoncus non. Curabitur tellus erat, venenatis
              fermentum volutpat in, congue ac leo. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Pellentesque et euismod ligula. Morbi
              mattis pretium eros, non ultricies urna rhoncus non. Curabitur
              tellus erat, venenatis fermentum volutpat in, congue ac leo.
            </p>
            <div className="flex flex-wrap gap-2">
              {/* Dynamically generate skill tags */}
              {course.skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-blue-100 text-blue-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
