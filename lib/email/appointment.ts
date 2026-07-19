import { CLINIC } from "@/lib/config/clinic";
import { sendMail } from "./smtp";


import { appointmentConfirmationTemplate } from "./templates/appointment-confirmation";
import { appointmentCancellationTemplate } from "./templates/appointment-cancellation";

type ConfirmationEmailProps = {
    patientName: string;
    patientEmail: string;
    date: string;
    slot: string;
    dayPreference: string;
    cancelLink: string;
};

type CancellationEmailProps = {
    patientName: string;
    patientEmail: string;
    date: string;
    slot: string;
    dayPreference: string;
    cancelReason: string;
};

export async function sendAppointmentConfirmation({
    patientName,
    patientEmail,
    date,
    slot,
    dayPreference,
    cancelLink,
}: ConfirmationEmailProps) {
    const subject = `Appointment Confirmation - ${CLINIC.name}`;

    const text = `
Dear ${patientName},

Your appointment has been successfully booked.

Clinic: ${CLINIC.name}
Doctor: ${CLINIC.doctor}

Date: ${date}
Preferred Day: ${dayPreference}
Slot: ${slot}

If you wish to cancel your appointment, please use the following link:

${cancelLink}

Regards,
${CLINIC.name}
${CLINIC.phone}
`;

    const html = appointmentConfirmationTemplate({
        patientName,
        date,
        slot,
        dayPreference,
        cancelLink,
    })

    await sendMail({
        to: patientEmail,
        subject,
        text,
        html,
    });
}

export async function sendAppointmentCancellation({
    patientName,
    patientEmail,
    date,
    slot,
    dayPreference,
    cancelReason,
}: CancellationEmailProps) {
    const subject = `Appointment Cancelled - ${CLINIC.name}`;

    const text = `
Dear ${patientName},

Your appointment has been cancelled successfully.

Clinic: ${CLINIC.name}
Doctor: ${CLINIC.doctor}

Date: ${date}
Preferred Day: ${dayPreference}
Slot: ${slot}

Cancellation Reason:
${cancelReason}

If this was a mistake, please book a new appointment.

Regards,
${CLINIC.name}
${CLINIC.phone}
`;

    const html = appointmentCancellationTemplate({
        patientName,
        date,
        slot,
        dayPreference,
        cancelReason,
    })

    await sendMail({
        to: patientEmail,
        subject,
        text,
        html,
    });
}