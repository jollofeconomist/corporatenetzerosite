import { connectToDatabase } from "../../../lib/db";
import CaseStudy from "../../../model/casestudy";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connectToDatabase();
    const caseStudies = await CaseStudy.find().sort({ year: -1 });
    return NextResponse.json(
      { caseStudies, message: "Case studies fetched successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching case studies:", error);
    return NextResponse.json(
      { error: "Failed to fetch case studies" },
      { status: 500 }
    );
  }
}
