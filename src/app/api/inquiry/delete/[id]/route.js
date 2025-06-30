import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Inquiry from "../../../../../model/inquiry";

export async function DELETE(req, context) {
  await connectToDatabase();
  try {
    const { id } = await context.params;
    const deleted = await Inquiry.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { message: "inqury not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ message: "Deleted successfully", deleted });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
