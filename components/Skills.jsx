"use client";

import { useEffect, useState } from "react";
import { getUser } from "@/utils/api";

export default function Skills({ email }) {
  const [isSkillsEditing, setisSkillsEditing] = useState(false);

  const [skills, setSkills] = useState([]); // Adjust to handle an array of skill objects
  const [newSkill, setNewSkill] = useState({ name: "", rating: "" });
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      const userRes = await getUser(email);
      setUser(userRes);
    };
    getUserData();
  }, [email]);

  useEffect(() => {
    if (
      user &&
      Array.isArray(user.skillsName) &&
      Array.isArray(user.skillsRating)
    ) {
      const mergedSkills = user.skillsName.map((name, index) => ({
        name,
        rating: user.skillsRating[index],
      }));
      setSkills(mergedSkills);
    }
  }, [user]);

  const handleAddClick = () => {
    setisSkillsEditing(true);
  };

  const handleSkillChange = (e) => {
    const { name, value } = e.target;
    setNewSkill({ ...newSkill, [name]: value });
  };

  // When adding a new skill
  const handleAddSkill = async (e) => {
    e.preventDefault();
    // const name = skills.name;
    // const rating = skills.rating;
    if (newSkill.name && newSkill.rating) {
      try {
        const response = await fetch("/api/profile/skill", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // Adjust this to send the newSkill as is
          body: JSON.stringify({
            email,
            name: newSkill.name,
            rating: newSkill.rating,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to add skill");
        }

        const data = await response.json();
        console.log("Skill added:", data.user);
        setUser(data.user);
        setNewSkill({ name: "", rating: "" });
        // setSkills({ ...skills, ...data.user });
        setisSkillsEditing(false);
      } catch (error) {
        console.error("An error occurred:", error);
        alert("Failed to add skill. Please try again.");
      }
    } else {
      console.log("Please select both a skill and a rating.");
      alert("Please select both a skill and a rating.");
    }
  };

  const handleDeleteSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  return (
    <div className="m-8">
      {isSkillsEditing && (
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center border-b-2 border-gray-200 py-2">
            <h2 className="text-2xl font-bold">SKILLS</h2>
            <button
              onClick={() => setisSkillsEditing(!isSkillsEditing)}
              className="text-blue-500 hover:text-blue-700 font-semibold py-2 px-4"
            >
              ✕ Cancel
            </button>
          </div>
          <div className="mt-4 flex flex-wrap">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="skill-name"
              >
                Skill Name *
              </label>
              <div className="relative">
                <select
                  id="skill-name"
                  name="name"
                  value={newSkill.name}
                  onChange={handleSkillChange}
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option>Select Skills</option>
                  <option>Python</option>
                  <option>Python Web Frameworks</option>
                  <option>Python For Data Analysis</option>
                  <option>Python For Data Visualization</option>
                  <option>Exploratory Data Analysis</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5.5 7l5 5 5-5H5.5z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="skill-rating"
              >
                Skill Rating *
              </label>
              <div className="relative">
                <select
                  id="skill-rating"
                  name="rating" // Set the name attribute to match your state object keys
                  value={newSkill.rating} // Use newSkill.rating here
                  onChange={handleSkillChange}
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option>Select Skill Level</option>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5.5 7l5 5 5-5H5.5z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button
              onClick={handleAddSkill} // You'll need to define this function to handle adding the skill
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              + ADD
            </button>
          </div>
        </div>
      )}
      {!isSkillsEditing && (
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center border-b-2 border-gray-200 py-2">
            <h2 className="text-2xl font-bold">SKILLS</h2>
            <button
              onClick={() => setisSkillsEditing(true)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              + ADD
            </button>
          </div>
          {skills.length > 0 ? (
            <div>
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center mt-2 bg-gray-100 rounded px-3 py-1"
                >
                  <span className="flex-grow">
                    {skill.name} ({skill.rating})
                  </span>
                  <button
                    onClick={() => handleDeleteSkill(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 py-2">No details are updated..</p>
          )}
        </div>
      )}
    </div>
  );
}
