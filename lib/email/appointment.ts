import { CLINIC } from "@/lib/config/clinic";
import { sendMail } from "./smtp";

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

    const html = `
    <h2>Appointment Confirmed</h2>

    <p>Dear <strong>${patientName}</strong>,</p>

    <p>Your appointment has been successfully booked.</p>

    <ul>
      <li><strong>Clinic:</strong> ${CLINIC.name}</li>
      <li><strong>Doctor:</strong> ${CLINIC.doctor}</li>
      <li><strong>Date:</strong> ${date}</li>
      <li><strong>Preferred Day:</strong> ${dayPreference}</li>
      <li><strong>Slot:</strong> ${slot}</li>
    </ul>

    <p>
      If you wish to cancel your appointment, click below:
    </p>

    <p>
      <a href="${cancelLink}">
        Cancel Appointment
      </a>
    </p>

    <br/>

    <p>
      Regards,<br/>
      <strong>${CLINIC.name}</strong><br/>
      ${CLINIC.phone}
    </p>
  `;

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

    const html = `
    <h2>Appointment Cancelled</h2>

    <p>Dear <strong>${patientName}</strong>,</p>

    <p>Your appointment has been cancelled successfully.</p>

    <ul>
      <li><strong>Clinic:</strong> ${CLINIC.name}</li>
      <li><strong>Doctor:</strong> ${CLINIC.doctor}</li>
      <li><strong>Date:</strong> ${date}</li>
      <li><strong>Preferred Day:</strong> ${dayPreference}</li>
      <li><strong>Slot:</strong> ${slot}</li>
      <li><strong>Cancellation Reason:</strong> ${cancelReason}</li>
    </ul>

    <p>
      If this was a mistake, you can always book a new appointment.
    </p>

    <br/>

    <p>
      Regards,<br/>
      <strong>${CLINIC.name}</strong><br/>
      ${CLINIC.phone}
    </p>
  `;

    await sendMail({
        to: patientEmail,
        subject,
        text,
        html,
    });
}