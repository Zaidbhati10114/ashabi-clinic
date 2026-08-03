import { APP } from "@/lib/config/app";
import { CLINIC } from "@/lib/config/clinic";

import { badge } from "../components/badge";
import { card } from "../components/card";
import { divider } from "../components/divider";
import { heading } from "../components/heading";
import { paragraph } from "../components/paragraph";

import {
    formatEmailDate,
    formatSlot,
} from "../utils";

import { emailLayout } from "./layout";
import { button } from "../components/button";

type AppointmentCancellationTemplateProps = {
    patientName: string;
    date: string;
    slot: string;
    dayPreference: string;
    cancelReason: string;
};

export function appointmentCancellationTemplate({
    patientName,
    date,
    slot,
    dayPreference,
    cancelReason,
}: AppointmentCancellationTemplateProps) {
    return emailLayout({
        title: "Appointment Cancelled",

        preheader:
            "Your appointment has been cancelled successfully.",

        content: `
      ${badge({
            text: "Appointment Cancelled",
            variant: "danger",
        })}

      ${heading({
            title: `Goodbye ${patientName}`,
            subtitle:
                "Your appointment has been cancelled successfully.",
        })}

      ${card({
            title: "Cancelled Appointment",
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
                {
                    label: "❌ Reason",
                    value: cancelReason,
                },
            ],
        })}

      ${paragraph({
            text:
                "If this cancellation was made by mistake, you can always schedule another appointment through our website.",
        })}

      ${button({
            text: "Book New Appointment",
            href: `${APP.url}/book`,
        })}

      ${divider()}

      ${paragraph({
            center: true,
            text: `
Need assistance?

📞 ${CLINIC.phone}

${CLINIC.email ? `✉️ ${CLINIC.email}<br><br>` : ""}

<a
href="${APP.url}"
style="color:#245889;text-decoration:none;font-weight:600;"
>
Visit Ashabi Clinic
</a>
`,
        })}
    `,
    });
}
