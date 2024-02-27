import React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import MyCourseLayout from "@/components/MyCourseLayout";

export default async function MyCourses() {
  const session = await getServerSession(authOptions);
  console.log(session);
  // console.log("hello");
  // console.log(session.user.trialUsed, session.user.trialActivated)
  if (!session) redirect("/auth/signin");
  return <MyCourseLayout name={session.user.name} email={session.user.email} />;
}
