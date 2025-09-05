
import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  const privateRoutes = ["/dashboard"];

  const publicRoutes = ["/login", "/signup"];

  if (!token && privateRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token && publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

// Apply to all routes
export const config = {
  matcher: ["/((?!_next|static|favicon.ico).*)"], // protect all except assets
};
