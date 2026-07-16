import { ADMIN_COOKIE_NAME, ADMIN_COOKIE_OPTIONS } from "@/lib/auth";
import { NextResponse } from "next/server";


export async function POST() {
    const response = NextResponse.json({
        success: true,
        message: "Logged out successfully",
    });

    console.log(response)

    response.cookies.set({
        name: ADMIN_COOKIE_NAME,
        value: "",
        ...ADMIN_COOKIE_OPTIONS,
        expires: new Date(0),
    });

    return response;
}