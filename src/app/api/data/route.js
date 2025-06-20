import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../lib/db";
import Data from "../../../model/data";

export async function POST(request) {
  try {
    const {
      companyName,
      sector,
      country,
      continent,
      netzero,
      targetyear,
      companyyearrevenue,
      scope,
      sciencebasedtargets,
    } = await request.json();

    if (!companyName || !sector || !country || !continent) {
      return NextResponse.json(
        {
          error: "Missing required fields",
          message: "Please fill all required fields",
        },
        { status: 400 }
      );
    }

    // if (companyyearrevenue !== undefined) {
    //   const revenueNum = Number(companyyearrevenue);

    //   if (isNaN(revenueNum) || revenueNum <= 0) {
    //     return NextResponse.json(
    //       {
    //         error: "Invalid revenue amount",
    //         message: "Revenue amount must be greater than or equal to 0",
    //       },
    //       { status: 400 }
    //     );
    //   }
    // }

    const dbConnection = await connectToDatabase();

    if (!dbConnection) {
      console.error("API: Database connection failed");
      return NextResponse.json(
        {
          error: "Database connection failed",
          message: "Unable to connect to database",
        },
        { status: 500 }
      );
    }

    // Create new data entry
    const newData = new Data({
      companyName,
      sector,
      country,
      continent,
      netzero,
      sciencebasedtargets,
      targetyear: netzero ? targetyear : undefined,
      companyyearrevenue: companyyearrevenue || undefined,
      scope: netzero ? scope : undefined,
    });

    console.log("API: Saving data to database...");
    const savedData = await newData.save();
    console.log("API: Data saved successfully:", savedData._id);

    return NextResponse.json(
      {
        data: savedData,
        message: "Company data saved successfully",
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("API Error:", error);

    // Handle specific error types
    if (error.name === "ValidationError") {
      return NextResponse.json(
        {
          error: "Validation Error",
          message: "Invalid data provided",
          details: error.message,
        },
        { status: 400 }
      );
    }

    if (error.name === "MongoError" || error.name === "MongoServerError") {
      return NextResponse.json(
        {
          error: "Database Error",
          message: "Failed to save data to database",
          details: error.message,
        },
        { status: 500 }
      );
    }

    // Generic error handler
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: "An unexpected error occurred",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      message: "API endpoint is working",
      endpoint: "/api/data",
      methods: ["POST"],
      status: "healthy",
    },
    { status: 200 }
  );
}
