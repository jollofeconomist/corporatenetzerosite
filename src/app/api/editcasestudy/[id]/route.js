import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import CaseStudy from "@/model/casestudy";
import mongoose from "mongoose";

export async function PATCH(req, context) {
  await connectToDatabase();
  const { id } = await context.params;
  const body = await req.json();
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { message: "Invalid ID format: not a valid MongoDB ObjectId" },
      { status: 400 }
    );
  }

  const findecasestudy = await CaseStudy.findById(id);
  if (!findecasestudy) {
    return NextResponse.json(
      { message: "Case study not found" },
      { status: 404 }
    );
  }

  const { title, company, industry, year, revenue, website, sections } = body;
  const updated = await CaseStudy.findByIdAndUpdate(
    id,
    {
      title,
      company,
      industry,
      year,
      revenue,
      website,
      sections,
    },
    { new: true }
  );
  return NextResponse.json({ message: "Updated", updated });
}
