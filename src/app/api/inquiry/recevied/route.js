import Inquiry from "../../../../model/inquiry";
import { connectToDatabase } from "../../../../lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();

    const inquiry = await Inquiry.find();
    return NextResponse.json(inquiry, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: "failes to fetch inquiry",
      },
      {
        status: 500,
      }
    );
  }
}
