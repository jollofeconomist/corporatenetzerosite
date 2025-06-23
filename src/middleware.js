import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
const { JWT_SECRET } = process.env;

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/api/data") ||
    pathname.startsWith("/api/updatedata") ||
    pathname.startsWith("/api/deletedata") ||
    pathname.startsWith("/api/casestudy") ||
    pathname === "/adddata"
  ) {
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
      console.error("Token:", token);
      console.error("JWT_SECRET available:", !!process.env.JWT_SECRET);

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

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/data",
    "/api/data/:path*",
    "/api/updatedata",
    "/api/updatedata/:path*",
    "/api/deletedata",
    "/api/casestudy",
    "/api/deletedata/:path*",
    "/adddata",
  ],
};
