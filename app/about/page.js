import React from "react";
import aboutBG from "@/assets/aboutBG.jpg";

export default function About() {
  return (
    <div
      className="absolute top-0 left-0 z-[-1] w-full h-screen pt-[12%] pr-12 text-white text-center bg-cover bg-fixed flex flex-col justify-center items-center"
      style={{ backgroundImage: `url(${aboutBG.src})` }}
    >
      <h1 className="text-[100px] font-normal">About Us</h1>
      <h2 className="text-5xl font-bold">Our Mission</h2>
      <p className="max-w-[350px] text-xl font-light">
        Our mission is to provide a platform for students to learn and grow in
        their career. We provide a wide range of courses to choose from. We also
        provide a platform for teachers to teach and earn. Lorem ipsum dolor sit
      </p>
    </div>
  );
}
