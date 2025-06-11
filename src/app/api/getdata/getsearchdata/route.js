import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../lib/db";
import Data from "../../../../model/data";
import { getSearchFilter } from "../../../../lib/getSearchFilter";

export async function GET(request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const searchQuery = searchParams.get("search") || "";
    const filter = getSearchFilter(searchQuery);

    const data = await Data.find(filter);
    const totallength = data.length;
    return NextResponse.json(
      {
        data,
        totallength,
        message: "all data featched succeessfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("error:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
