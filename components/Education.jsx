"use client";

import React, { useState } from "react";

export default function Education() {
  const [isEducationEditing, setisEducationEditing] = useState(false);

  const [educationList, setEducationList] = useState([
    // This is where the education details will be added
    // Example:
    // { year: "2024", degree: "Bachelor of Engineering/Technology", fieldOfStudy: "Computer Science", institution: "shiv nadar university, Noida, Uttar Pradesh, India", grade: "8.46CGPA" }
  ]);

  const [newEducation, setNewEducation] = useState({
    year: "",
    degree: "",
    fieldOfStudy: "",
    institution: "",
    grade: "",
  });

  const handleAddEducation = () => {
    setisEducationEditing(true);
  };

  const handleSaveEducation = () => {
    if (
      newEducation.year &&
      newEducation.degree &&
      newEducation.fieldOfStudy &&
      newEducation.institution &&
      newEducation.grade
    ) {
      setEducationList([...educationList, newEducation]);
      setNewEducation({
        year: "",
        degree: "",
        fieldOfStudy: "",
        institution: "",
        grade: "",
      });
      setisEducationEditing(false);
    } else {
      alert("Please fill out all the fields.");
    }
  };

  const handleCancel = () => {
    setisEducationEditing(false);
    setNewEducation({
      year: "",
      degree: "",
      fieldOfStudy: "",
      institution: "",
      grade: "",
    });
  };

  // Function to remove an education entry
  const removeEducationEntry = (index) => {
    setEducationList(educationList.filter((_, i) => i !== index));
  };

  return (
    <div className="container  mx-auto p-2">
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

const EducationCard = ({ year, degree, fieldOfStudy, institution, grade }) => {
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
          <span className="font-bold">Graduation/Degree:</span> {degree}
        </p>
        <p className="text-gray-600 text-base">
          <span className="font-bold">Field of Study:</span> {fieldOfStudy}
        </p>
        <p className="text-gray-600 text-base">
          <span className="font-bold">Institution:</span> {institution}
        </p>
        <p className="text-gray-600 text-base">
          <span className="font-bold">Grade:</span> {grade}
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
                name="degree"
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                value={education.degree}
                onChange={handleChange}
              >
                <option>Select Course</option>
                <option>SSC/10th</option>
                <option>HSC/12th/Equivalent</option>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <option>Bachelor's</option>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
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
              htmlFor="aggregate"
            >
              Aggregate *
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="aggregate"
              type="text"
              placeholder="Aggregate"
              name="grade"
              value={education.grade}
              onChange={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="aggregate-type"
            >
              Aggregate Type *
            </label>
            <div className="relative">
              <select
                id="aggregate-type"
                name="aggregateType"
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                value={education.aggregateType}
                onChange={handleChange}
              >
                <option>Select Aggregate Type</option>
                <option>Percentage</option>
                <option>CGPA</option>
                {/* Add other aggregate types as needed */}
              </select>
            </div>
          </div>
        </div>

        {/* Repeat the pattern above for other fields like School/College, Year of Passing, etc. */}

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
