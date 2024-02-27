"use client";

import { useRouter } from "next/navigation";
import { FaArrowRight } from "react-icons/fa";
import bgImg from "@/assets/homeBG.jpg";
import Navbar from "@/components/Navbar";

//eslint-disable-next-line
export default async function Home() {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/courses");
  };

  return (
    <div>
      <Navbar />
      <section
        className="absolute top-0 left-0 z-[-1] w-full h-screen pt-[17%] pr-12 text-white bg-cover bg-fixed"
        style={{ backgroundImage: `url(${bgImg.src})` }}
      >
        <div className="container mx-auto">
          <div className="w-1/2">
            <div className="text-center py-5">
              <h1 className="text-3xl font-bold text-[#1eb2a6]">
                Unlock Innovation with Our New Courses
              </h1>
              <p>
                Build high-impact skills from leading experts to advance your
                organization and career.
              </p>
            </div>
            <p className="text-lg text-[#666]">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere
              id iusto distinctio necessitatibus illum corrupti labore
              consequatur aliquid, voluptatem, ipsa velit ex possimus totam sed!
              Ipsa deleniti vitae hic at?
            </p>
            <div>
              <button
                className="bg-[#1eb2a6] text-white px-5 py-2.5 rounded cursor-pointer flex items-center"
                onClick={handleButtonClick}
              >
                GET STARTED <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
