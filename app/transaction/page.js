import Layout from "@/components/Layout";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import TransactionPage from "@/components/TransactionPage";
import { redirect } from "next/navigation";

export default async function Transaction() {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session) redirect("/auth/signin");
  return (
    <Layout name={session.user.name}>
      <TransactionPage email={session.user.email} />
    </Layout>
  );
}
