"use client";
// app/courses/[id]/page.jsx
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { addCourse, getUser } from "@/utils/api";
import { useRouter } from "next/navigation";

export default function CoursePage({ id, email, name }) {
  const [course, setCourse] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [user, setUser] = useState(null);

  const router = useRouter();

  useEffect(() => {
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

  if (!course) {
    return <p>Loading...</p>;
  }

  const add = () => {
    console.log(email);
    try {
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
    <div className=" w-full h-full flex flex-col gap-8">
      <div className="flex justify-between mb-8">
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
        <div>
          <Image
            src={course.cover}
            alt={course.courseName}
            width={300}
            height={300}
          />
        </div>
      </div>

      <div className="flex gap-20 w-full h-full">
        <div className="flex-shrink-0">
          <Image
            src="/impressions.png"
            alt="Skill Badge"
            width={300}
            height={300}
          />
        </div>
        <div className="flex-grow">
          <h2 className="text-5xl font-bold mb-2">About Course</h2>
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
          <div className="flex flex-wrap gap-4">
            {course.skills.map((skill) => (
              <span
                key={skill}
                className="bg-blue-100 text-blue-800 text-sm font-semibold mr-2 px-3 py-1 rounded dark:bg-blue-200 dark:text-blue-800"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
