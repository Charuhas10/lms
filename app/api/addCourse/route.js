import { connectMongoDB } from "@/lib/mongodb";
import Course from "@/models/course";
import Transaction from "@/models/transaction";
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

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("updatedUser: ", updatedUser);

    const course = await Course.findOne({ _id: courseid });
    const amount = course.credits;

    const newTransaction = new Transaction({
      userId: userid,
      courseId: courseid,
      amount: amount,
    });
    await newTransaction.save();

    return NextResponse.json({ updatedUser });
  } catch (error) {
    console.log(error);
  }
}
