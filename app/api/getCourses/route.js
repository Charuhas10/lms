import { connectMongoDB } from "@/lib/mongodb";
import Course from "@/models/course";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectMongoDB();
    const courses = await Course.find();
    return NextResponse.json({ courses });
  } catch (error) {
    console.log(error);
  }
}
