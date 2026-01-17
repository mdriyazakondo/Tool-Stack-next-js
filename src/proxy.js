import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function proxy(request) {
  const pathname = request.nextUrl.pathname;

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });


  if (!token) {
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${pathname}`, request.url),
    );
  }


  if (pathname.startsWith("/dashboard") && token.role !== "user") {
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${pathname}`, request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
