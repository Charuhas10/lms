import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CoursePage from "@/components/CoursePage";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function CPage({ params }) {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session) redirect("/auth/signin");
  const { id } = params;

  return (
    <CoursePage id={id} email={session.user.email} name={session.user.name} />
  );
}
