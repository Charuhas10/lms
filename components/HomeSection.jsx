import Image from "next/image";
import src from "@/assets/test.jpg";
import Link from "next/link";

export default function HomeSection({ session }) {
  console.log(session);
  return (
    <div className="bg-white text-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center">
          {/* Text Section */}
          <div className="md:w-1/2 lg:w-2/5 space-y-4">
            <p className="text-indigo-600 font-semibold mb-10">
              Start Learning Today
            </p>
            <h1 className="text-5xl font-extrabold text-gray-900 md:text-left">
              The Best <br /> Platform Enroll in Your Special Course
            </h1>
            <p className="text-gray-500">
              {/* eslint-disable-next-line */}
              "Our mission is to help people to find the best course — online
              {/* eslint-disable-next-line */}
              and learn with expert anywhere"
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <Link
                href="/auth/signin"
                className="bg-indigo-600 text-white px-6 py-3 rounded-md shadow-lg font-medium hover:bg-indigo-700 transition duration-300"
              >
                {session ? "Courses" : "Get Started Now →"}
              </Link>
              <Link
                href="/about"
                className="text-indigo-600 px-6 py-3 rounded-md shadow-lg font-medium hover:text-indigo-700 transition duration-300"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Image Section */}
          <div className="md:w-1/2 lg:w-3/5">
            <Image src={src} alt="Woman" />
          </div>
        </div>

        {/* Companies Section */}
        <div className="flex justify-center items-center space-x-6 mt-12">
          <p className="text-gray-500 text-sm">Trusted by 4,000+ companies</p>
          <div className="flex space-x-4">
            {/* Replace these with actual logos and company names */}
            <div className="h-6 text-gray-800">Company A</div>
            <div className="h-6 text-gray-800">Company B</div>
            <div className="h-6 text-gray-800">Company C</div>
            <div className="h-6 text-gray-800">Company D</div>
            <div className="h-6 text-gray-800">Company E</div>
          </div>
        </div>
      </div>
    </div>
  );
}
