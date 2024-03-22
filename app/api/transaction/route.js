import { connectMongoDB } from "@/lib/mongodb";
import Transaction from "@/models/transaction";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectMongoDB();
    const { email } = await req.json();
    const user = await User.findOne({ email });
    const id = user._id;

    const transaction = await Transaction.find({ userId: id })
      .sort({ createdAt: -1 })
      .limit(10);
    return NextResponse.json({ transaction });
  } catch (error) {
    console.log(error);
  }
}
