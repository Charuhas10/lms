import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const MyCourseCard = ({ id, title, imageUrl, isFree, credits, email }) => {
  const router = useRouter();

  return (
    <div className="max-w-xs h-[364px] rounded overflow-hidden shadow-lg">
      <div className="w-full h-40 relative">
        <Image src={imageUrl} alt="Course" layout="fill" objectFit="cover" />
      </div>
      <div className="flex-grow px-6 py-4 flex flex-col justify-between">
        {/* Use flex-grow to allow the text section to fill available space */}
        <h3 className="font-bold text-xl mb-2">{title}</h3>
        <p className="text-gray-700 text-base mb-4">
          {isFree ? "Free" : `Credits: ${credits}`}
        </p>
        <button
          onClick={() => router.push(`/courses/${id}`)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Know More
        </button>
      </div>
    </div>
  );
};

export default MyCourseCard;
