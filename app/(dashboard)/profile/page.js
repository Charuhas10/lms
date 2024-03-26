import React from "react";
import Education from "@/components/Education";
import Profile from "@/components/Profile";
import Skills from "@/components/Skills";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Profilepage() {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session) redirect("/auth/signin");
  return (
    <div className=" w-full h-full">
      <Profile name={session.user.name} email={session.user.email} />
      <Skills email={session.user.email} />
      <Education email={session.user.email} />
    </div>
  );
}
