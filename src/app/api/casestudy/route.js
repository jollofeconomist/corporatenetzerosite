import CaseStudy from "../../../model/casestudy";
import { connectToDatabase } from "../../../lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectToDatabase();

    const { title, company, industry, year, revenue, website, sections } =
      await request.json();
    const newCaseStudy = new CaseStudy({
      title,
      company,
      industry,
      year,
      revenue,
      website,
      sections: sections.map((section) => ({
        heading: section.heading,
        content: section.content,
      })),
    });
    await newCaseStudy.save();
    return NextResponse.json(
      { message: "Case study created successfully", newCaseStudy },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating case study:", error);
    return NextResponse.json(
      { error: "Failed to create case study" },
      { status: 500 }
    );
  }
}
