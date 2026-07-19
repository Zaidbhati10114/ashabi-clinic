import { appointmentConfirmationTemplate } from "@/lib/email/templates/appointment-confirmation";
import { appointmentCancellationTemplate } from "@/lib/email/templates/appointment-cancellation";

export default function EmailPreviewPage() {
  const confirmationHtml = appointmentConfirmationTemplate({
    patientName: "Zaid Bhati",
    date: "2026-07-25",
    slot: "morning",
    dayPreference: "Saturday",
    cancelLink: "https://example.com/cancel?token=abc123",
  });

  const cancellationHtml = appointmentCancellationTemplate({
    patientName: "Zaid Bhati",
    date: "2026-07-25",
    slot: "morning",
    dayPreference: "Saturday",
    cancelReason: "Feeling better",
  });

  return (
    <div className="min-h-screen bg-gray-200 py-10 space-y-16">
      <section className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Appointment Confirmation</h1>

        <div
          className="rounded-xl shadow-xl overflow-hidden bg-white"
          dangerouslySetInnerHTML={{
            __html: confirmationHtml,
          }}
        />
      </section>

      <section className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Appointment Cancellation</h1>

        <div
          className="rounded-xl shadow-xl overflow-hidden bg-white"
          dangerouslySetInnerHTML={{
            __html: cancellationHtml,
          }}
        />
      </section>
    </div>
  );
}
