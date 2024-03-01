import Layout from "@/components/Layout";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Transaction() {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session) redirect("/auth/signin");
  return (
    <Layout name={session.user.name}>
      <h1>Transaction Page</h1>
      <p>This is the transaction page</p>
    </Layout>
  );
}
