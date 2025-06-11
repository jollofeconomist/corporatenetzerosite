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

    let page = parseInt(searchParams.get("page")) || 1;
    let limit = parseInt(searchParams.get("limit")) || 10;

    page = Math.max(1, page);
    limit = Math.max(1, Math.min(100, limit));

    const totalDocs = await Data.countDocuments();
    const totalPages = Math.ceil(totalDocs / limit) || 1;

    page = Math.min(page, totalPages);

    const skip = (page - 1) * limit;
    const data = await Data.find(filter).skip(skip).limit(limit);
    const totalvaleachpage = data.length;

    return NextResponse.json(
      {
        data,
        totalvaleachpage,
        page,
        limit,
        totalDocs,
        totalPages,
        message: totalDocs === 0 ? "No companies found" : undefined,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "failed to fetch data" },
      {
        status: 500,
      }
    );
  }
}
