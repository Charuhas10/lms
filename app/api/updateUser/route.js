import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectMongoDB();
  } catch (error) {
    console.log(error);
    return NextResponse.error(error);
  }
}
