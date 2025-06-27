import News from "../../../../../model/news";
import { connectToDatabase } from "../../../../../lib/db";
import { NextResponse } from "next/server";

export async function DELETE(req, context) {
  try {
    await connectToDatabase();

    const { id } = await context.params;
    const deleted = await News.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        {
          message: "news not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({ message: "Deleted successfully", deleted });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
