// import Image from "next/image";
import { addCourse, getUser } from "@/utils/api";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const CourseCard = ({ id, title, imageUrl, isFree, credits, email }) => {
  const router = useRouter();

  const add = async () => {
    console.log(email);
    try {
      const user = await getUser(email);

      if (user) {
        console.log(user);

        // Check if course is free or if user has enough credits
        if (isFree || user.credits >= credits) {
          if (!isFree) {
            user.credits -= credits; // Assuming 'credits' is the cost of the course
          }

          const remainingCredits = user.credits;

          const updatedUser = addCourse(user._id, id, remainingCredits);

          if (updatedUser) router.push("/mycourses");
        } else {
          // Handle not enough credits
          alert("You do not have enough credits to purchase this course");
        }
      } else {
        // Handle userResponse not OK
        console.log("Failed to fetch user details");
      }
    } catch (error) {
      console.error("An unexpected error happened:", error);
    }
  };

  return (
    <div className="max-w-xs h-[364px] rounded overflow-hidden shadow-lg hover:shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
      <div className="w-full h-40 relative">
        {/* Adjust height as per your design */}
        <Image
          src={imageUrl}
          alt="Course"
          layout="fill" // This makes the image fill the container
          objectFit="cover" // Adjust how the image fits within the container
        />
      </div>
      <div className="flex-grow px-6 py-4 flex flex-col justify-between">
        {" "}
        {/* Use flex-grow to allow the text section to fill available space */}
        <h3 className="font-bold text-xl mb-2">{title}</h3>
        <p className="text-gray-700 text-base mb-4">
          {isFree ? "Free" : `Credits: ${credits}`}
        </p>
        <div className="flex justify-between">
          <button
            onClick={() => router.push(`/courses/${id}`)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Know More
          </button>
          <button
            onClick={add}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
