"use client";

import { Avatar } from "@mui/material";
import Sidebar from "./Sidebar";
import React, { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import MyCourseCard from "./MyCourseCard";
import Link from "next/link";

export default function Test({ name, email }) {
  const [allCourses, setAllCourses] = useState([]);
  const [displayCourses, setDisplayCourses] = useState([]); // Added displayCourses state
  const [user, setUser] = useState(null);
  const [filter, setFilter] = useState("all"); // Added filter state
  const router = useRouter();

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

  const [isFreeOpen, setIsFreeOpen] = useState(false);
  const [isSkillsOpen, setIsSkillsOpen] = useState(false);
  const [isFreeSelected, setIsFreeSelected] = useState(false);
  const [isPremiumSelected, setIsPremiumSelected] = useState(false);

  const allSkills = [
    ...new Set(
      displayCourses.flatMap((course) =>
        course.skills.map((skill) => skill.toLowerCase())
      )
    ),
  ];
  console.log("hello", allSkills);

  const updateFilter = (filterType) => {
    // Toggle the selected state based on which filter was clicked
    if (filterType === "free") {
      setIsFreeSelected((prev) => !prev);
      // If the other filter is not selected, set the filter to the current one or 'all'
      setFilter((prev) => (isPremiumSelected && !prev ? "all" : "free"));
    } else if (filterType === "premium") {
      setIsPremiumSelected((prev) => !prev);
      setFilter((prev) => (isFreeSelected && !prev ? "all" : "premium"));
    }

    // Reset to 'all' if both are unselected
    if (
      (!isFreeSelected && filterType === "premium") ||
      (!isPremiumSelected && filterType === "free")
    ) {
      setFilter("all");
    }
  };

  useEffect(() => {
    if (isFreeSelected && isPremiumSelected) {
      setFilter("all");
    } else if (!isFreeSelected && !isPremiumSelected) {
      setFilter("all");
    } else if (isFreeSelected) {
      setFilter("free");
    } else if (isPremiumSelected) {
      setFilter("premium");
    }
  }, [isFreeSelected, isPremiumSelected]);

  const [selectedSkills, setSelectedSkills] = useState([]);

  const handleSkillChange = (skill) => {
    setSelectedSkills((prevSkills) => {
      const skillIndex = prevSkills.indexOf(skill);
      if (skillIndex > -1) {
        return [
          ...prevSkills.slice(0, skillIndex),
          ...prevSkills.slice(skillIndex + 1),
        ];
      } else {
        return [...prevSkills, skill];
      }
    });
  };

  const filteredCourses = displayCourses.filter((course) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "free" && course.isFree) ||
      (filter === "premium" && !course.isFree);
    const matchesSkills =
      selectedSkills.length === 0 ||
      course.skills.some((skill) =>
        selectedSkills.includes(skill.toLowerCase())
      );
    return matchesFilter && matchesSkills;
  });

  return (
    <div className=" flex flex-col gap-8">
      <div>
        <div className="flex gap-10 mt-5">
          <div>
            <div className="p-3 border rounded shadow">
              <button
                onClick={() => setIsFreeOpen(!isFreeOpen)}
                className="flex items-center justify-between w-full text-left"
              >
                <span>Free / Premium</span>
                <span>{isFreeOpen ? "-" : "+"}</span>
              </button>
              {isFreeOpen && (
                <div className="mt-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      name="free"
                      checked={isFreeSelected}
                      onChange={() => updateFilter("free")}
                    />
                    <span>Free</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      name="premium"
                      checked={isPremiumSelected}
                      onChange={() => updateFilter("premium")}
                    />
                    <span>Premium</span>
                  </label>
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="p-3 border rounded shadow">
              <button
                onClick={() => setIsSkillsOpen(!isSkillsOpen)}
                className="flex items-center justify-between w-full text-left"
              >
                <span>Skills</span>
                <span>{isSkillsOpen ? "-" : "+"}</span>
              </button>
              {isSkillsOpen && (
                <div
                  className="mt-2 overflow-y-auto max-h-[6rem] "
                  // Adjust max-h-[10rem] to the height that works for showing 5 items
                >
                  {allSkills.map((skill) => (
                    <label key={skill} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        name={skill}
                        checked={selectedSkills.includes(skill)}
                        onChange={() => handleSkillChange(skill)}
                      />
                      <span>{skill}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="grid grid-cols-4 gap-6 ">
          {Array.isArray(filteredCourses) &&
            filteredCourses.map((course) => (
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
    </div>
  );
}
