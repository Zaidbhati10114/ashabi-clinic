import { NextRequest, NextResponse } from "next/server";

import { convex } from "@/lib/convex/server";
import { api } from "@/convex/_generated/api";

import { sendAppointmentCancellation } from "@/lib/email/appointment";

type CancelAppointmentRequest = {
    cancelToken: string;
    cancelReason: string;
};

export async function POST(req: NextRequest) {
    try {
        const body: CancelAppointmentRequest = await req.json();

        const { cancelToken, cancelReason } = body;

        if (!cancelToken || !cancelReason) {
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

        const appointment = await convex.mutation(
            api.appointments.publicCancelAppointment,
            {
                cancelToken,
                cancelReason,
            }
        );

        try {
            await sendAppointmentCancellation({
                patientName: appointment.name,
                patientEmail: appointment.email,
                date: appointment.date,
                slot: appointment.slot,
                dayPreference: appointment.dayPreference || "Any",
                cancelReason,
            });
        } catch (emailError) {
            console.error(
                "Failed to send cancellation email:",
                emailError
            );
        }

        return NextResponse.json({
            success: true,
            message: "Appointment cancelled successfully.",
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message: "Unable to cancel appointment.",
            },
            {
                status: 500,
            }
        );
    }
}