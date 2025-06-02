import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../lib/db";
import Data from "../../../model/data";

export async function POST(request) {
  const {
    companyName,
    sector,
    country,
    continent,
    netzero,
    targetyear,
    companyyearrevenue,
    scope,
  } = await request.json();

  try {
    await connectToDatabase();

    const newData = new Data({
      companyName,
      sector,
      country,
      continent,
      netzero,
      targetyear,
      companyyearrevenue,
      scope,
    });
    await newData.save();
    return NextResponse.json(
      { data: newData, message: "Data saved successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ error: "Failed to save data" }, { status: 500 });
  }
}
