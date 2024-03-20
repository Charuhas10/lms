import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";

const handleErrors = (err) => {
  console.log("TESTINg");
  let errors = { email: "", password: "" };

  //duplicate error code
  if (err.code === 11000) {
    errors.email = "That email is already registered";
    return errors;
  }

  //validation errors
  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectMongoDB();
    await User.create({ name, email, password: hashedPassword });

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    console.log("Came here");
    const errors = handleErrors(error);
    console.log(errors);
    return NextResponse.json({ errors }, { status: 500 });
    // return NextResponse.json(
    //   { message: "An error occurred while registering the user." },
    //   { status: 500 }
    // );
  }
}
