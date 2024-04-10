"use client";

import { getUser } from "@/utils/api";
import React, { useEffect, useState } from "react";

export default function Education({ email }) {
  const [isEducationEditing, setisEducationEditing] = useState(false);
  const [educationList, setEducationList] = useState([]);
  const [newEducation, setNewEducation] = useState({
    educationLevel: "",
    country: "",
    institution: "",
    year: "",
    grade: "",
    gradeType: "",
  });
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
      Array.isArray(user.educationLevel) &&
      Array.isArray(user.country) &&
      Array.isArray(user.institution) &&
      Array.isArray(user.year) &&
      Array.isArray(user.grade) &&
      Array.isArray(user.gradeType)
    ) {
      const mergedEducation = user.educationLevel.map(
        (educationLevel, index) => ({
          educationLevel,
          country: user.country[index],
          institution: user.institution[index],
          year: user.year[index],
          grade: user.grade[index],
          gradeType: user.gradeType[index],
        })
      );
      setEducationList(mergedEducation);
    }
  }, [user]);

  const handleAddEducation = () => {
    setisEducationEditing(true);
  };

  const handleSaveEducation = async (e) => {
    e.preventDefault();
    if (
      newEducation.educationLevel &&
      newEducation.country &&
      newEducation.institution &&
      newEducation.year &&
      newEducation.grade &&
      newEducation.gradeType 
    ) {
      try {
        const res = await fetch("/api/profile/education", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            educationLevel: newEducation.educationLevel,
            country: newEducation.country,
            institution: newEducation.institution,
            year: newEducation.year,
            grade: newEducation.grade,
            gradeType: newEducation.gradeType,
          }),
        });

        if (!res.ok) {
          throw new Error("failed to add education");
        }

        const data = await res.json();
        console.log(data);
        setUser(data.user);

        setNewEducation({
          educationLevel: "",
          country: "",
          institution: "",
          year: "",
          grade: "",
          gradeType: "",
        });
        setisEducationEditing(false);
      } catch (error) {
        console.error("An error occurred:", error);
        alert("Failed to add skill. Please try again.");
      }
      // setEducationList([...educationList, newEducation]);
    } else {
      alert("Please fill out all the fields.");
    }
  };

  const handleCancel = () => {
    setisEducationEditing(false);
    setNewEducation({
      educationLevel: "",
      country: "",
      institution: "",
      year: "",
      grade: "",
      gradeType: "",
    });
  };

  // Function to remove an education entry
  const removeEducationEntry = (index) => {
    setEducationList(educationList.filter((_, i) => i !== index));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center border-b-2 border-gray-200 py-2">
        <h2 className="text-2xl font-bold">EDUCATION</h2>

        {!isEducationEditing && (
          <button
            onClick={handleAddEducation}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            + ADD
          </button>
        )}
      </div>

      {!isEducationEditing ? (
        educationList.map((edu, index) => (
          <EducationCard key={index} {...edu} />
        ))
      ) : (
        <EducationForm
          education={newEducation}
          setEducation={setNewEducation}
          onSave={handleSaveEducation}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}

const EducationCard = ({
  educationLevel,
  country,
  institution,
  year,
  grade,
  gradeType,
}) => {
  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
      <div className="mb-6">
        <div className="text-gray-700 font-bold text-xl mb-2 flex justify-between items-center">
          <span>{year}</span>
          <div>
            <button className="text-blue-500 hover:text-blue-700 mr-2">
              {/* Icon for edit */}
            </button>
            <button className="text-red-500 hover:text-red-700">
              {/* Icon for delete */}
            </button>
          </div>
        </div>

        <p className="text-gray-600 text-base">
          <span className="font-bold">Graduation/Degree:</span> {educationLevel}
        </p>
        <p className="text-gray-600 text-base">
          <span className="font-bold">Country:</span> {country}
        </p>
        <p className="text-gray-600 text-base">
          <span className="font-bold">Institution:</span> {institution}
        </p>
        <p className="text-gray-600 text-base">
          <span className="font-bold">Grade:</span> {grade}
        </p>
        <p className="text-gray-600 text-base">
          <span className="font-bold">Grade Type:</span> {gradeType}
        </p>
      </div>
    </div>
  );
};

const EducationForm = ({ education, setEducation, onSave, onCancel }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEducation({ ...education, [name]: value });
  };

  return (
    <div className="mt-4 bg-white p-6 shadow-md rounded-lg">
      <form className="w-full">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Education Level *
            </label>
            <div className="relative">
              <select
                name="educationLevel"
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                value={education.educationLevel}
                onChange={handleChange}
              >
                <option>Select Course</option>
                <option>SSC/10th</option>
                <option>HSC/12th/Equivalent</option>
                {/* eslint-disable-next-line  */}
                <option>Bachelor's</option>
                {/* eslint-disable-next-line  */}
                <option>Master's</option>
                <option>Ph.D.</option>
              </select>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Country *
            </label>
            <div className="relative">
              <select
                name="country"
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                value={education.country}
                onChange={handleChange}
              >
                <option>Select Country</option>
                <option>A</option>
                <option>B</option>
                <option>C</option>
                <option>D</option>
                <option>E</option>
                <option>F</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="school-college"
            >
              School/College *
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="school-college"
              type="text"
              placeholder="School/College"
              name="institution"
              value={education.institution}
              onChange={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="year-of-passing"
            >
              Year of Passing *
            </label>
            <div className="relative">
              <select
                id="year-of-passing"
                name="year"
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                value={education.year}
                onChange={handleChange}
              >
                <option>Select Year of passing</option>
                {/* Replace with your years array if you have it */}
                {[...Array(30)].map((_, index) => {
                  const year = new Date().getFullYear() - index;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grade"
            >
              Grade *
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grade"
              type="text"
              placeholder="Grade"
              name="grade"
              value={education.grade}
              onChange={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grade-type"
            >
              grade Type *
            </label>
            <div className="relative">
              <select
                id="grade-type"
                name="gradeType"
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                value={education.gradeType}
                onChange={handleChange}
              >
                <option>Select grade Type</option>
                <option>Percentage</option>
                <option>CGPA</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSave}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
