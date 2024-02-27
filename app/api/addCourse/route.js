import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectMongoDB();
    const { userid, courseid } = await req.json();
    const user = await User.findOne({ _id: userid });
    console.log("user: ", user);
    const updatedUser = await User.findByIdAndUpdate(
      { _id: userid },
      {
        $addToSet: { enrolledCourses: courseid },
      },
      { new: true }
    ).populate("enrolledCourses"); // Optionally populate to return updated courses

    // const updatedUser = await User.findOneAndUpdate(
    //   { _id: userid },
    //   { enrolledCourses: [...user.enrolledCourses, courseid] }
    // );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("updatedUser: ", updatedUser);
    return NextResponse.json({ updatedUser });
  } catch (error) {
    console.log(error);
  }
}
