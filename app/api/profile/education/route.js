import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectMongoDB;
    const {
      email,
      educationLevel,
      country,
      institution,
      year,
      grade,
      gradeType,
    } = await req.json();
    console.log(
      email,
      educationLevel,
      country,
      institution,
      year,
      grade,
      gradeType
    );
    const updatedUser = await User.findOneAndUpdate(
      { email },
      {
        $push: {
          educationLevel,
          country,
          institution,
          year,
          grade,
          gradeType,
        },
      },
      { new: true }
    );
    if (!updatedUser) {
      throw new Error("User not found");
    }
    console.log("User updated with new education:", updatedUser);
    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
