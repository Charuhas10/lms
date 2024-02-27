import Wallet from "@/components/Wallet";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function WalletPage() {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session) redirect("/auth/signin");
  return (
    <div>
      <Wallet email={session.user.email} />
    </div>
  );
}
