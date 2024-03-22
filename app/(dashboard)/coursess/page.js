import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
// import { authOptions } from "../api/auth/[...nextauth]/route";
import CourseLayout from "@/components/CourseLayout";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Courses() {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session) redirect("/auth/signin");
  return <CourseLayout name={session.user.name} email={session.user.email} />;
}
