import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectMongoDB();
    const { email, name, rating } = await req.json(); // Assuming newSkill is an object with name and rating
    console.log(email, name, rating);
    // Update user document by pushing new skill name and rating
    const updatedUser = await User.findOneAndUpdate(
      { email },
      {
        $push: {
          skillsName: name, // Assuming you want to push the name into the skillsName array
          skillsRating: rating, // And the rating into the skillsRating array
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error("User not found");
    }
    console.log(updatedUser.skillsName, updatedUser.skillsRating);
    console.log("User updated with new skill:", updatedUser);
    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
