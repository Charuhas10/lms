"use client";

import React, { useState } from "react";
import { FiEdit3 } from "react-icons/fi";

export default function Profile() {
  const [isProfileEditing, setisProfileEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    mail: "",
    dob: "",
    fatherName: "",
    address: "",
    email: "",
    gender: "",
  });

  const handleEditToggle = () => {
    setisProfileEditing(!isProfileEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setisProfileEditing(false);
  };

  return (
    <div className="m-8">
      {isProfileEditing && (
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center border-b-2 border-gray-200 py-2">
            <h2 className="text-2xl font-bold">PROFILE</h2>
          </div>
          <form className="bg-white p-6 rounded shadow-md space-y-4 max-w-3xl mx-auto">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="first-name"
                >
                  First Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="first-name"
                  type="text"
                  placeholder="First Name"
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="last-name"
                >
                  Last Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="last-name"
                  type="text"
                  placeholder="Last Name"
                />
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="email"
                  type="email"
                  placeholder="Email"
                />
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="about-me"
                >
                  About Me
                </label>
                <textarea
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="about-me"
                  placeholder="About Me"
                ></textarea>
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="dob"
                >
                  DoB
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="dob"
                  type="date"
                  placeholder="Date of Birth"
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="gender"
                >
                  Gender
                </label>
                <div className="relative">
                  <select
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="gender"
                  >
                    <option>Select Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
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
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleEditToggle}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
      {!isProfileEditing && (
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center border-b-2 border-gray-200 py-2">
            <h2 className="text-2xl font-bold">PROFILE</h2>
            <button
              onClick={() => handleEditToggle()}
              className="mt-4 bg-blue-500 text-white px-3 py-1 rounded flex items-center space-x-1"
            >
              <FiEdit3 className="text-sm" />
              <span>Edit</span>
            </button>
          </div>
          {/* <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm mx-auto"> */}
          {/* <div className="flex items-center space-x-4"> */}
          {/* <div className="rounded-full bg-gray-200 h-16 w-16 flex items-center justify-center">
              </div> */}
          <div className="flex-1">
            <h2 className="text-xl font-semibold">{profile.name || "Name"}</h2>
            <p className="text-sm text-gray-500">MAIL: {profile.mail}</p>
            <p className="text-sm text-gray-500">DOB: {profile.dob}</p>
            <p className="text-sm text-gray-500">
              FATHER NAME: {profile.fatherName}
            </p>
            <p className="text-sm text-gray-500">ADDRESS: {profile.address}</p>
          </div>
          {/* </div> */}
          <div className="mt-4">
            <h3 className="text-sm font-semibold">EMAIL</h3>
            <p className="text-sm text-gray-500">{profile.email} </p>
          </div>
          {/* </div> */}
        </div>
      )}
    </div>
  );
}
