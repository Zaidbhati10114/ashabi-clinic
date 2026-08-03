
import type { Metadata } from 'next'
import BookingForm from '../components/BookingForm'
import Header from '../components/Header'
import Footer from '../components/Footer'
import DoctorInfoStrip from '../components/DoctorInfoStrip'

export const metadata: Metadata = {
  title: 'Book Appointment | Ashabi Clinic',
  description: 'Book your appointment with Dr. Sahirabanu Faruk Bhati at Ashabi Clinic, Sangli.',
}

 function BookPage() {
  return (
    <main className="min-h-screen bg-sky">

      {/* ─── NAV — identical to landing ─── */}
      <Header ctaType="back" backHref="/" />

      {/* ─── DOCTOR STRIP — mirrors Doctor Info section bg ─── */}
      <DoctorInfoStrip />

      {/* ─── PAGE HEADING — matches landing hero/section heading pattern ─── */}
      <section className="max-w-5xl mx-auto px-6 pt-14 pb-8">
        <p className="text-xs font-medium tracking-[0.2em] text-blue-500 uppercase mb-2">
          Ashabi Clinic · Sangli
        </p>
        <h1 className="font-display text-5xl md:text-6xl text-blue-800 leading-tight mb-2">
          Book<br />Appointment
        </h1>
        <p className="font-display italic text-2xl text-blue-500">
          Takes less than a minute.
        </p>
      </section>

      {/* ─── FORM CARD — bg-white border border-blue-100 rounded-xl matches landing cards ─── */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <div className="max-w-xl bg-white border border-blue-100 rounded-2xl shadow-sm p-6 sm:p-8">
          <BookingForm />
        </div>
      </section>

      {/* ─── FOOTER — identical to landing ─── */}
      <Footer />

    </main>
  )
}

export default BookPage
