import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("authToken")?.value;

  // Define allowed paths
  const notAllowedPaths = ["/dashboard", "/projects", "/reports", "/portfolio"];

  // Check if the request path is not allowed and there's no access token
  if (notAllowedPaths.includes(request.nextUrl.pathname) && !accessToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  const allowedPaths = ["/", "/signup"];

  // Check if the request path is not allowed and there's no access token
  if (allowedPaths.includes(request.nextUrl.pathname) && accessToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Allow access to the requested URL if the access token is present or the path is allowed
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
// export const config = {
//   matcher: ["/dashboard", "/projects","reports","portfolio"],
// };
