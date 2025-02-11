import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-path", request.nextUrl.pathname);
  return NextResponse.next({
    headers: requestHeaders,
  });
}

export default auth(middleware);
