import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);



export type SendMailOptions = {
    to: string;
    subject: string;
    html: string;
    text?: string;
};

export async function sendMail({
    to,
    subject,
    html,
    text,
}: SendMailOptions) {
    const recipient =
        process.env.NODE_ENV === "development" &&
            process.env.DEV_EMAIL_OVERRIDE
            ? process.env.DEV_EMAIL_OVERRIDE
            : to;
    try {
        const { data, error } = await resend.emails.send({
            from: process.env.EMAIL_FROM!,
            to: recipient!,
            subject,
            html,
            text,
        });

        if (error) {
            console.error("[Resend API Error]:", error);
            throw new Error(error.message);
        }

        return data;
    } catch (error) {
        console.error("Failed to send email:", error);
        throw error;
    }
}