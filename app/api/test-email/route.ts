import { NextResponse } from "next/server";
import { sendMail } from "@/lib/email/smtp";

export async function GET() {
    try {
        await sendMail({
            to: process.env.SMTP_USER!,
            subject: "SMTP Test",
            html: "<h1>SMTP is working 🎉</h1>",
            text: "SMTP is working",
        });

        return NextResponse.json({
            success: true,
            message: "Email sent successfully",
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to send email",
            },
            { status: 500 }
        );
    }
}