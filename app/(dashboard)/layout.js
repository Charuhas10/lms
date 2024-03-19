import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Layout from "@/components/Layout";

export default async function DashboardLayout({ children }) {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session) redirect("/auth/signin");
  const name = session.user.name;
  return <Layout name={name}>{children}</Layout>;
}
