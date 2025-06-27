import mongoose from "mongoose";
import { connectToDatabase } from "../../../../lib/db";
import { NextResponse } from "next/server";
import News from "../../../../model/news";

export async function GET(req) {
  try {
    await connectToDatabase();

    const news = await News.find();
    return NextResponse.json(
      {
        news,
        message: "it's fetch succesfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error fetching case studies:", error);
    return NextResponse.json(
      { error: "Failed to fetch case studies" },
      { status: 500 }
    );
  }
}
