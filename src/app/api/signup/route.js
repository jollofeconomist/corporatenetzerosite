import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../lib/db";
import admin from "../../../model/admin";
import bcrypt from "bcryptjs";

export async function POST(request) {
  const { email, password } = await request.json();

  try {
    await connectToDatabase();

    const existingUser = await admin.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Username already exists" },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new admin({
      email,
      password: hashedPassword,
    });
    await newUser.save();
    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error connecting to the database:", error);
    return NextResponse.json(
      { error: "Database connection failed" },
      { status: 500 }
    );
  }
}
