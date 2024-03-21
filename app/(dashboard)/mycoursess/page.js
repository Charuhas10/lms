import React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import MyCourseLayout from "@/components/MyCourseLayout";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Test from "@/components/Test";
// import Test from "@/components/MyCourseLayout";

export default async function MyCourses() {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session) redirect("/auth/signin");
  return <Test name={session.user.name} email={session.user.email} />;
}
