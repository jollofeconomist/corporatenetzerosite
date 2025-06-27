import News from "../../../../../model/news";
import { connectToDatabase } from "../../../../../lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req, context) {
  try {
    await connectToDatabase();

    const { id } = await context.params;
    const { title, info, content, sourceUrl } = await req.json();

    const findenews = await News.findById(id);
    if (!findenews) {
      return NextResponse.json(
        { message: "news not found" },
        {
          status: 404,
        }
      );
    }

    const upadated = await News.findByIdAndUpdate(
      id,
      {
        title,
        info,
        content,
        sourceUrl,
      },
      {
        new: true,
      }
    );

    return NextResponse.json({ message: "updated", upadated });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
