import { NextRequest, NextResponse } from "next/server";

// No cookie-based authentication - using localStorage only
// This middleware just allows all routes for demo purposes

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isApiRoute = path.startsWith("/api");

  console.log("path:", path, "isApiRoute:", isApiRoute, "cookie exists: false");

  // Allow all routes - no authentication required for demo
  return NextResponse.next();
}
