import React from "react";
import aboutBG from "@/assets/aboutBG.jpg";
import Navbar from "@/components/Navbar";

export default function About() {
  return (
    <>
      <Navbar />
      <div
        className="absolute top-0 left-0 z-[-1] w-full h-full text-black text-center bg-cover bg-fixed flex flex-col justify-center items-center"
        style={{ backgroundImage: `url(${aboutBG.src})` }}
      >
        {/* <div> */}
        <h1 className="text-[100px] font-normal">About Us</h1>
        <h2 className="text-5xl font-bold mb-4">Our Mission</h2>
        <p className="max-w-[350px] text-xl font-light">
          Our mission is to provide a platform for students to learn and grow in
          their career. We provide a wide range of courses to choose from. We
          also provide a platform for teachers to teach and earn. Lorem ipsum
          dolor sit
        </p>
        {/* </div> */}
      </div>
    </>
  );
}
