import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const { JWT_SECRET } = process.env;

const RATE_LIMIT = 100;
const TIME_WINDOW = 60 * 1000;
const ipRequestMap = new Map();

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  const protectedPaths =
    pathname.startsWith("/api/data") ||
    pathname.startsWith("/api/updatedata") ||
    pathname.startsWith("/api/deletedata") ||
    pathname.startsWith("/api/casestudy") ||
    pathname === "/adddata" ||
    pathname.startsWith("/api/news/addnews") ||
    pathname.startsWith("/api/news/deletnews") ||
    pathname.startsWith("/api/news/editnews") ||
    pathname.startsWith("/api/editcasestudy") ||
    pathname.startsWith("/api/inquiry/delete");

  if (protectedPaths) {
    const ip =
      request.ip ?? request.headers.get("x-forwarded-for") ?? "unknown";
    const now = Date.now();
    const requestTimestamps = ipRequestMap.get(ip) || [];
    const recentRequests = requestTimestamps.filter(
      (timestamp) => now - timestamp < TIME_WINDOW
    );

    if (recentRequests.length >= RATE_LIMIT) {
      return new NextResponse(
        JSON.stringify({
          error: "Too many requests",
          message: "Rate limit exceeded. Try again in a minute.",
        }),
        {
          status: 429,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    recentRequests.push(now);
    ipRequestMap.set(ip, recentRequests);
  }

  if (request.method === "GET" && pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;

  if (!token) {
    if (pathname.startsWith("/api/")) {
      return new NextResponse(
        JSON.stringify({
          error: "Authentication required",
          message: "Please login to access this endpoint",
        }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return NextResponse.redirect(new URL("/admin", request.url));
  }

  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch (error) {
    console.error("JWT verification error:", error.message);

    if (pathname.startsWith("/api/")) {
      return new NextResponse(
        JSON.stringify({
          error: "Invalid token",
          message: "Authentication token is invalid or expired",
        }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return NextResponse.redirect(new URL("/admin", request.url));
  }
}

export const config = {
  matcher: [
    "/api/data",
    "/api/data/:path*",
    "/api/updatedata",
    "/api/updatedata/:path*",
    "/api/deletedata",
    "/api/deletedata/:path*",
    "/api/casestudy",
    "/adddata",
    "/api/news/addnews",
    "/api/news/deletnews/:path*",
    "/api/news/editnews/:path*",
    "/api/inquiry/delete/:path*",
    "/api/editcasestudy/:path*",
  ],
};
