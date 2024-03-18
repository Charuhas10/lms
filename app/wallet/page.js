import Wallet from "@/components/Wallet";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function WalletPage() {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session) redirect("/auth/signin");
  const email = session.user.email;
  return (
    <div>
      <Wallet email={email} />
    </div>
  );
}

// email={session.user.email}
