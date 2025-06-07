import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export function middleware(req) {
  const token = cookies().get(process.env.COOKIE_NAME)?.value;

  const currentPathname = req.nextUrl.pathname;
  if (currentPathname === "/") {
    return NextResponse.next();
  }

  const protectedRoute = ["/dashboard", "/manage-parking", "/transaction"];
  const isProtected = protectedRoute.some((r) => currentPathname.startsWith(r));
  if (!token) {
    if (isProtected) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  const isUnProtectedRoutes = ["/login", "/register"];
  const isUnProtected = isUnProtectedRoutes.some((r) =>
    currentPathname.startsWith(r)
  );
  if (token) {
    if (isUnProtected) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
}
