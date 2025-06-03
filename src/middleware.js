import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
const { JWT_SECRET } = process.env;

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api")) {
    if (request.method === "GET") {
      return NextResponse.next();
    }

    const token = request.cookies.get("token")?.value;

    if (!token) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    try {
      const secret = new TextEncoder().encode(JWT_SECRET);
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch (error) {
      console.error("JWT verification error:", error.message);
      console.error("Token:", token);
      console.error("JWT_SECRET available:", !!process.env.JWT_SECRET);
      return new NextResponse(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
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
    "/api/deletedata/:path*",
  ],
};
