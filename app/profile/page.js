import React from "react";
import Education from "@/components/Education";
import Profile from "@/components/Profile";
import Skills from "@/components/Skills";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Profilepage() {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session) redirect("/auth/signin");
  return (
    <div>
      <Profile name={session.user.name} email={session.user.email} />
      <Skills />
      <Education />
    </div>
  );
}
