import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

function middleware(request: NextRequest) {
  // Skip middleware for static files and Next.js internal routes
  if (
    request.nextUrl.pathname.startsWith("/_next") ||
    request.nextUrl.pathname.startsWith("/static") ||
    request.nextUrl.pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-path", request.nextUrl.pathname);
  return NextResponse.next({
    headers: requestHeaders,
  });
}

export default auth(middleware);
