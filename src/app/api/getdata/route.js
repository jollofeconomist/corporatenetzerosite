import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../lib/db";
import Data from "../../../model/data";

export async function GET(request) {
  try {
    await connectToDatabase();
    // const { searchParams } = new URL(request.url);

    // const page = parseInt(searchParams.get("page")) || 1;
    // const limit = parseInt(searchParams.get("limit")) || 10;

    // const skip = (page - 1) * limit;
    // const filters = {};
    // const totalCount = await Data.countDocuments(filters);

    const data = await Data.find().sort({ companyName: 1 });
    //console.log("DATA COUNT:", data.length);
    return NextResponse.json(
      { data, message: "Data fetched successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
