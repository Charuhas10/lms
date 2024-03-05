import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectMongoDB();
    const { email, name, dob, about, gender } = req.body;
    console.log("hello");
    const updatedUser = await User.findOneAndUpdate(
      { email },
      {
        $set: {
          name,
          dob,
          about,
          gender,
          // You might also want to update `updatedAt` manually if not using Mongoose's timestamps
        },
      },
      { new: true }
    );
    console.log("User updated:", updatedUser);
    return NextResponse.json({ updatedUser });
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
