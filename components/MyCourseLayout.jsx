"use client";

import { Avatar } from "@mui/material";
import Sidebar from "./Sidebar";
import React, { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import MyCourseCard from "./MyCourseCard";

export default function MyCourseLayout({ name, email }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [allCourses, setAllCourses] = useState([]);
  const [displayCourses, setDisplayCourses] = useState([]); // Added displayCourses state
  const [user, setUser] = useState(null);
  const [filter, setFilter] = useState("all"); // Added filter state
  const router = useRouter();

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  useEffect(() => {
    const getCourses = async () => {
      try {
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

        const res = await fetch("/api/getCourses", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          const fetchedCourses = await res.json();
          // console.log(fetchedCourses.courses);
          // console.log(fetchedCourses.courses[0]._id);
          setAllCourses(fetchedCourses.courses);
        } else {
          console.error("Failed to fetch courses");
        }
      } catch (error) {
        console.error("An unexpected error happened:", error);
      }
    };
    getCourses();
  }, [email]);

  useEffect(() => {
    // Filter logic separated and only run when user or allCourses changes
    const filterCourses = () => {
      if (user && user.enrolledCourses) {
        const filteredCourses = allCourses.filter((course) =>
          user.enrolledCourses.includes(course._id)
        );
        setDisplayCourses(filteredCourses);
      } else {
        setDisplayCourses(allCourses);
      }
    };

    filterCourses();
  }, [user, allCourses]);

  const updateFilter = (newFilter) => {
    setFilter(newFilter);
  };

  const filteredCourses = displayCourses.filter((course) => {
    if (filter === "all") return true;
    if (filter === "free") return course.isFree;
    if (filter === "premium") return !course.isFree;
  });

  const handleLogout = () => {
    signOut();
    console.log("User logged out");
    setIsPopupOpen(false);
    router.push("/");
  };

  return (
    <div className="grid grid-cols-[70px_1fr] grid-rows-[90px_1fr] gap-0">
      {/* Sidebar - div1 */}
      <div className="col-start-1 col-end-2 row-start-1 row-end-3">
        <Sidebar />
      </div>

      {/* Header and Avatar - div2 */}
      <div className="col-start-2 col-end-3 row-start-1 row-end-2 flex justify-between p-10">
        <div>
          <h2>Hello {name}</h2>
          <p>Welcome to your dashboard</p>

          <div>
            <button onClick={() => updateFilter("all")} className="mr-2">
              All
            </button>
            <button onClick={() => updateFilter("free")} className="mr-2">
              Free
            </button>
            <button onClick={() => updateFilter("premium")}>Premium</button>
          </div>
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

      {/* Placeholder for course cards - div3 */}
      <div className="col-start-2 col-end-3 row-start-2 row-end-3 grid grid-cols-3 gap-8 mt-8 ml-8">
        {Array.isArray(displayCourses) &&
          displayCourses.map((course) => (
            <MyCourseCard
              key={course._id}
              id={course._id}
              title={course.courseName}
              imageUrl={course.cover}
              isFree={course.isFree}
              credits={course.credits}
              email={email}
            />
          ))}
      </div>
    </div>
  );
}
