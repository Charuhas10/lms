"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { activateTrial, getUser } from "@/utils/api";

export default function Wallet({ email }) {
  const router = useRouter();
  const [trialActive, setTrialActive] = useState(false);

  useEffect(() => {
    const trialStatus = async () => {
      const user = await getUser(email);
      console.log("Final testing", user);
      setTrialActive(user.trialActivated);
    };
    trialStatus();
    if (trialActive) router.push("/courses");
  }, [email, trialActive]);

  const activate = async () => {
    const updatedUser = await activateTrial(email);
    setTrialActive(true);
    router.push("/courses");
  };

  return (
    <>
      <nav className="flex justify-between items-center p-4">
        <Link href="/">
          <Image
            src="/courseIcon.png"
            width={120}
            height={80}
            alt="Course Icon"
          />
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
