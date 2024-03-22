import Layout from "@/components/Layout";
import { getServerSession } from "next-auth";
import TransactionPage from "@/components/TransactionPage";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Transaction() {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session) redirect("/auth/signin");
  return (
      <TransactionPage email={session.user.email} />
  );
}
