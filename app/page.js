import HomeSection from "@/components/HomeSection";
import { getServerSession } from "next-auth";
import Navbar from "@/components/Navbar";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <Navbar session={session} />
      <HomeSection session={session} />
    </div>
  );
}
