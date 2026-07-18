import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, verifyAdminToken } from "./lib/auth";


export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Allow login page
    if (pathname === "/admin/login") {
        return NextResponse.next();
    }

    // Protect admin routes
    if (pathname.startsWith("/admin")) {
        const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;

        if (!token) {
            return NextResponse.redirect(
                new URL("/admin/login", req.url)
            );
        }

        const valid = await verifyAdminToken(token);

        if (!valid) {
            return NextResponse.redirect(
                new URL("/admin/login", req.url)
            );
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};