"use client";

import React, { useEffect, useState } from "react";
import MyCourseCard from "./MyCourseCard";
import { getCourses, getUser } from "@/utils/api";

export default function MyCourseLayout({ name, email }) {
  const [allCourses, setAllCourses] = useState([]);
  const [displayCourses, setDisplayCourses] = useState([]); // Added displayCourses state
  const [user, setUser] = useState(null);
  const [filter, setFilter] = useState("all");
  const [isFreeOpen, setIsFreeOpen] = useState(false);
  const [isSkillsOpen, setIsSkillsOpen] = useState(false);
  const [isFreeSelected, setIsFreeSelected] = useState(false);
  const [isPremiumSelected, setIsPremiumSelected] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      const fCourses = await getCourses();
      const userRes = await getUser(email);
      setUser(userRes);
      setAllCourses(fCourses);
    };
    fetchCourse();
  }, [email]);

  useEffect(() => {
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

  const allSkills = [
    ...new Set(
      displayCourses.flatMap((course) =>
        course.skills.map((skill) => skill.toLowerCase())
      )
    ),
  ];

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
    <div className=" w-full h-full flex flex-col gap-8">
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
                  className="mt-2 overflow-y-auto overflow-x-hidden max-h-[6rem] "
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
        <div className="grid grid-cols-4 gap-6 mb-8">
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
