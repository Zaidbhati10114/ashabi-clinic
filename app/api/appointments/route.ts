import { NextRequest, NextResponse } from "next/server";
import { convex } from "@/lib/convex/server";
import { api } from "@/convex/_generated/api";
import { sendAppointmentConfirmation } from "@/lib/email/appointment";
import { APP } from "@/lib/config/app";
import { AppointmentRequest } from "@/types/appointment-request";


export async function POST(req: NextRequest) {
    try {
        // 1. Parse body
        const body: AppointmentRequest = await req.json();

        // 2. Validate

        const {
            name,
            phone,
            email,
            age,
            date,
            dayPreference,
            slot,
            reason,
        } = body;

        if (
            !name ||
            !phone ||
            !email ||
            !date ||
            !slot
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Missing required fields.",
                },
                {
                    status: 400,
                }
            );
        }

        // 3. Create appointment via Convex mutation

        const result = await convex.mutation(
            api.appointments.publicCreateAppointment,
            {
                name,
                phone,
                age,
                email,
                date,
                dayPreference,
                slot,
                reason,
            }
        );

        // 4. Build cancel URL

        const cancelLink =
            `${APP.url}/cancel?token=${result.cancelToken}`;

        // 5. Send email

        try {
            await sendAppointmentConfirmation({
                patientName: name,
                patientEmail: email,
                date,
                slot,
                dayPreference,
                cancelLink,
            });
        } catch (emailError) {
            console.error("Failed to send confirmation email:", emailError);
        }

        // 6. Return success
        return NextResponse.json({
            success: true,
            message: "Appointment booked successfully.",
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message: "Unable to create appointment. Please try again later.",
            },
            { status: 500 }
        );
    }
}