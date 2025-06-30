import Inquiry from "../../../../model/inquiry";
import { connectToDatabase } from "../../../../lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToDatabase();

    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        {
          message: "fill the missing fields",
        },
        {
          status: 400,
        }
      );
    }
    const newinquiry = new Inquiry({
      name,
      email,
      subject,
      message,
    });

    await newinquiry.save();
    return NextResponse.json(
      { message: "Inquiry submitted succesfully", newinquiry },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Server error", details: error.message },
      { status: 500 }
    );
  }
}
