// app/api/deletecasestudy/[id]/route.js

import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import CaseStudy from "@/model/casestudy";

export async function DELETE(req, context) {
  await connectToDatabase();

  try {
    const { id } = await context.params;
    const deleted = await CaseStudy.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { message: "Case study not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Deleted successfully", deleted });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
