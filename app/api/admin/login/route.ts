import { verifyAdminCredentials, createAdminToken, ADMIN_COOKIE_NAME, ADMIN_COOKIE_OPTIONS } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        const { username, password } = await req.json();

        if (
            typeof username !== "string" ||
            typeof password !== "string"
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid request",
                },
                { status: 400 }
            );
        }

        const isValid = await verifyAdminCredentials(
            username,
            password
        );

        if (!isValid) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid username or password",
                },
                { status: 401 }
            );
        }

        const token = await createAdminToken();

        const response = NextResponse.json({
            success: true,
            message: "Login successful",
        });

        response.cookies.set({
            name: ADMIN_COOKIE_NAME,
            value: token,
            ...ADMIN_COOKIE_OPTIONS,
            maxAge: 60 * 60 * 24 * 7,
        });

        return response;
    } catch (error) {
        console.error("Admin login error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong",
            },
            { status: 500 }
        );
    }
}