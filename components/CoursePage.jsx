"use client";
// app/courses/[id]/page.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Avatar } from "@mui/material";
import Image from "next/image";
import { signOut } from "next-auth/react";

export default function CoursePage({ id, email, name }) {
  const [course, setCourse] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    // Fetch course details based on `id`
    const fetchCourse = async () => {
      const userRes = await fetch("/api/getUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (userRes.ok) {
        const { user } = await userRes.json();
        setUser(user);
      }
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

  const addCourse = async () => {
    console.log(email);
    try {
      if (user.trialActivated) {
        console.log("Trial activated");
        console.log(id);
        const res = await fetch("/api/addCourse", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userid: user._id, courseid: id }),
        });

        if (res.ok) {
          const { updatedUser } = await res.json();
          console.log(updatedUser);
          alert("Course added successfully");
          router.push("/mycourses");
        }
      } else {
        alert("You have not activated your trial yet");
        router.push("/wallet");
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
          <h1>Available: {user.credits}</h1>
        </div>

        <div onClick={togglePopup} className="cursor-pointer">
          <Avatar>{name.slice(0, 2).toUpperCase()}</Avatar>
          {isPopupOpen && (
            <div
              className="z-10"
              style={{ position: "absolute", right: 0, marginTop: "10px" }}
            >
              {/* Style this div as per your design requirements */}
              <button
                className=" border-2 text-center border-gray-200 p-2 rounded-md shadow-md w-40 h-15 z-10 bg-red-600"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="col-start-2 col-end-3 row-start-2 row-end-3 p-10">
        <div className="flex justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-4">{course.courseName}</h2>
            <p className="text-lg mb-4">Faculty Development Program</p>
            <p className="text-lg font-semibold mb-4">
              Hands-on, Virtual Instructor-led Training
            </p>
            <p className="text-lg mb-4">INR: {course.credits}</p>
            <p className="text-lg mb-8">Can purchase with credits + cash</p>
            <button
              onClick={addCourse}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300 ease-in-out"
            >
              Add to wallet
            </button>
            <div className="mt-4">
              <p className="text-lg">
                Benefits: Get Certified and earn 30 credits
              </p>
            </div>
          </div>
          <Image src={course.cover} alt="Course" width={300} height={300} />
        </div>
      </div>
    </div>
  );
}
