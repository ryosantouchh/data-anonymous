import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const token = await getToken({
    req: request,
    secret: "NEXTAUTH_SECRET",
  });

  if (!token?.accessToken) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  } else {
    if (pathname !== "/") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = { matcher: ["/", "/my-blog", "/me"] };