"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import src from "../assets/courseIcon.png";

export default function Wallet({ email }) {
  const router = useRouter();
  const [trialActive, setTrialActive] = useState(false);

  useEffect(() => {
    // Function to check the trial status
    const checkTrialStatus = async () => {
      try {
        const response = await fetch("/api/getUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        if (response.ok) {
          const { user } = await response.json();
          setTrialActive(user.trialActivated);
        } else {
          console.error("Failed to fetch trial status");
        }
      } catch (error) {
        console.error("An unexpected error happened:", error);
      }
    };

    checkTrialStatus();
  }, [email]);

  const activate = async () => {
    try {
      // const data = await fetch("/api/getUser", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ email }),
      // });

      // const { user } = await data.json();
      // const trialUsed = user.trialUsed;
      // const trialActivated = user.trialActivated;
      // console.log("hello");
      // console.log(user);
      // console.log(trialUsed, trialActivated);

      const res = await fetch("/api/trial", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        const updatedUser = await res.json();
        console.log(updatedUser);
        setTrialActive(true);
        router.push("/courses");
      } else {
        console.error("Failed to activate trial");
      }
    } catch (error) {
      console.error("An unexpected error happened:", error);
    }
  };

  // const activate = () => {
  //   setTrialActive(true);
  //   router.push("/wallet");
  // };

  return (
    <>
      <nav className="flex justify-between items-center p-4">
        <Link href="/">
          <Image src={src} alt="Course Icon" className="w-[120px] h-[80px]" />
        </Link>
        <Link href="/courses">
          <h1>Application</h1>
        </Link>
      </nav>
      <div className="flex justify-center items-start p-6 gap-5">
        <div className="bg-white rounded-3xl shadow p-6 w-full max-w-[300px] text-left mb-5">
          <h2 className="text-black text-2xl font-bold mb-4">
            7-day Free Trial
          </h2>
          <p className="text-black text-xl mb-8">
            Unlimited access to Skills Wallet
          </p>
          <ul className="list-none p-0 mb-8">
            <li className="text-left py-2 text-lg text-gray-600">
              Unlock a World of Learning
            </li>
            <li className="text-left py-2 text-lg text-gray-600">
              Personalized Learning Journey
            </li>
            <li className="text-left py-2 text-lg text-gray-600">
              Recognition and Certifications
            </li>
            <li className="text-left py-2 text-lg text-gray-600">
              Exclusive Networking Opportunities
            </li>
            <li className="text-left py-2 text-lg text-gray-600">
              Discounts on Premium Resources
            </li>
            <li className="text-left py-2 text-lg text-gray-600">
              Continuous Skill Assessment
            </li>
          </ul>
          <button
            className={`bg-blue-500 text-white py-4 px-6 rounded-full font-semibold text-lg w-full ${
              trialActive ? "bg-green-500" : ""
            }`}
            onClick={activate}
            disabled={trialActive}
          >
            {trialActive ? "7-day FREE Trial Activated" : "Activate FREE Trial"}
          </button>
        </div>
        <div className="bg-white rounded-3xl shadow p-6 w-full max-w-[300px] text-left mb-5">
          <h2 className="text-black text-2xl font-bold mb-4">
            One time payment
          </h2>
          <p className="text-black text-xl mb-8">
            Unlimited access to Skills Wallet
          </p>
          <ul className="list-none p-0 mb-8">
            <li className="text-left py-2 text-lg text-gray-600">
              Unlock a World of Learning
            </li>
            <li className="text-left py-2 text-lg text-gray-600">
              Personalized Learning Journey
            </li>
            <li className="text-left py-2 text-lg text-gray-600">
              Recognition and Certifications
            </li>
            <li className="text-left py-2 text-lg text-gray-600">
              Exclusive Networking Opportunities
            </li>
            <li className="text-left py-2 text-lg text-gray-600">
              Discounts on Premium Resources
            </li>
            <li className="text-left py-2 text-lg text-gray-600">
              Continuous Skill Assessment
            </li>
          </ul>
          <button className="bg-blue-500 text-white py-4 px-6 rounded-full font-semibold text-lg w-full">
            Activate now
          </button>
        </div>
      </div>
    </>
  );
}
