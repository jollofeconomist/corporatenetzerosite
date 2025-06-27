import News from "../../../../model/news";
import { connectToDatabase } from "../../../../lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectToDatabase();

    const { title, info, content, sourceUrl } = await request.json();

    if (!content) {
      return NextResponse.json(
        {
          message: "content is missing",
        },
        {
          status: 400,
        }
      );
    }

    const newnews = new News({ title, info, content, sourceUrl });

    await newnews.save();

    return NextResponse.json(
      {
        message: "content creted",
        newnews,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create case study" },
      { status: 500 }
    );
  }
}
