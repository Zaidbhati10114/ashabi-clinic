import { APP } from "@/lib/config/app";
import { CLINIC } from "@/lib/config/clinic";

import { badge } from "../components/badge";
import { button } from "../components/button";
import { card } from "../components/card";
import { divider } from "../components/divider";
import { heading } from "../components/heading";
import { paragraph } from "../components/paragraph";
import { spacer } from "../components/spacer";
import {
    formatEmailDate,
    formatSlot,
} from "../utils";

import { emailLayout } from "./layout";

type AppointmentConfirmationTemplateProps = {
    patientName: string;
    date: string;
    slot: string;
    dayPreference: string;
    cancelLink: string;
};

export function appointmentConfirmationTemplate({
    patientName,
    date,
    slot,
    dayPreference,
    cancelLink,
}: AppointmentConfirmationTemplateProps): string {
    return emailLayout({
        title: "Appointment Confirmed",

        preheader: "Your appointment has been confirmed successfully.",

        content: `
      ${badge({
            text: "Appointment Confirmed",
            variant: "success",
        })}

      ${heading({
            title: `Hello ${patientName}!`,
            subtitle:
                "We're pleased to confirm your appointment. Below are your appointment details.",
        })}

      ${spacer()}

      ${card({
            title: "Appointment Details",
            items: [
                {
                    label: "🏥 Clinic",
                    value: CLINIC.name,
                },
                {
                    label: "👩‍⚕️ Doctor",
                    value: CLINIC.doctor,
                },
                {
                    label: "📅 Date",
                    value: formatEmailDate(date),
                },
                {
                    label: "🗓 Preferred Day",
                    value: dayPreference,
                },
                {
                    label: "🕒 Time Slot",
                    value: formatSlot(slot),
                },
            ],
        })}

      ${paragraph({
            text:
                "If your plans change, you can cancel your appointment anytime using the button below.",
        })}

      ${button({
            text: "Cancel Appointment",
            href: cancelLink,
        })}

      ${divider()}

      ${paragraph({
            center: true,
            text: `
Need help?

📞 ${CLINIC.phone}

${CLINIC.email ? `✉️ ${CLINIC.email}<br><br>` : ""}

You can also visit our website anytime.

<a
href="${APP.url}"
style="color:#245889;font-weight:600;text-decoration:none;"
>
${APP.url}
</a>
`,
        })}
    `,
    });
}
