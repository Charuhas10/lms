import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectMongoDB();
    const { email, skills } = await req.json(); // Assuming skills is an array of skill objects
    console.log("Adding skills to user:", skills, email);
    if (!skills || skills.length === 0) {
      throw new Error("No skills provided");
    }

    // Update user document by pushing new skills to the skills array
    const updatedUser = await User.findOneAndUpdate(
      { email }, // find a document by email
      {
        $push: { skills: { $each: skills } }, // Use $push with $each to add all skills in the array
      },
      { new: true } // Return the modified document rather than the original
    );

    if (!updatedUser) {
      throw new Error("User not found");
    }

    console.log("User updated with new skills:", updatedUser);
    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
