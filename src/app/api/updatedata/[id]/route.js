import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../lib/db";
import Data from "../../../../model/data";

export async function PATCH(request, { params }) {
  const awaitedParams = await params;
  const { id } = awaitedParams;
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

    const updatedData = await Data.findByIdAndUpdate(
      id,
      {
        companyName,
        sector,
        country,
        continent,
        netzero,
        targetyear,
        companyyearrevenue,
        scope,
      },
      { new: true }
    );

    if (!updatedData) {
      return NextResponse.json({ error: "Data not found" }, { status: 404 });
    }

    return NextResponse.json(
      { data: updatedData, message: "Data updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating data:", error);
    return NextResponse.json(
      { error: "Failed to update data" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  const awaitedParams = await params;
  const { id } = awaitedParams;

  try {
    await connectToDatabase();

    const deletedData = await Data.findByIdAndDelete(id);

    if (!deletedData) {
      return NextResponse.json({ error: "Data not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Data deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting data:", error);
    return NextResponse.json(
      { error: "Failed to delete data" },
      { status: 500 }
    );
  }
}
