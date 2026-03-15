'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, Variants } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { supabase } from '@/lib/supabase/supabase'
import Header from '../components/Header'
import Footer from '../components/Footer'
import DoctorInfoStrip from '../components/DoctorInfoStrip'

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!

const CANCEL_REASONS = [
  'Changed plans',
  'Feeling better', 
  'Doctor unavailable',
  'Other'
]

type PageState = 'loading' | 'confirming' | 'not_found' | 'already_cancelled' | 'ready' | 'done' | 'error'

type Appointment = {
  id: string
  name: string
  phone: string
  age: string
  date: string
  day_preference: string
  slot: string
  reason: string
  status: string
  cancel_token: string
}

// ─── ANIMATION VARIANTS ────────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
}

// ─── HELPER FUNCTIONS ───────────────────────────────────────────────────────────
function formatDate(dateStr: string) {
  if (!dateStr) return ''
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-IN', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

// ─── STATE COMPONENTS ───────────────────────────────────────────────────────────
function LoadingState() {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="show"
      className="text-center py-16"
    >
      <div className="w-14 h-14 bg-[#f0f5f0] rounded-full flex items-center justify-center mx-auto mb-5">
        <svg className="animate-spin w-6 h-6 text-sage-600" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      </div>
      <p className="text-xs font-medium tracking-[0.2em] text-sage-500 uppercase mb-2">
        Please wait
      </p>
      <h2 className="font-display text-3xl text-sage-800 mb-2">
        Looking up your appointment…
      </h2>
      <p className="font-display italic text-lg text-sage-400">
        This will only take a second.
      </p>
    </motion.div>
  )
}

function NotFoundState() {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="show"
      className="text-center py-16"
    >
      <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center text-2xl mx-auto mb-5">
        ❌
      </div>
      <p className="text-xs font-medium tracking-[0.2em] text-sage-500 uppercase mb-2">
        Invalid Link
      </p>
      <h2 className="font-display text-3xl text-sage-800 mb-2">
        Appointment Not Found
      </h2>
      <p className="font-display italic text-lg text-sage-500 mb-6">
        This cancellation link has expired or is invalid.
      </p>
      <p className="text-sm text-sage-600 mb-8">
        Please call us directly to cancel your appointment.
      </p>
      <div className="space-y-3">
        <a
          href="tel:+918856819580"
          className="inline-flex items-center justify-center gap-2 bg-sage-600 text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-sage-700 transition-colors"
        >
          📞 Call Us: 8856819580
        </a>
        <div>
          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 border border-sage-300 text-sage-700 text-sm font-medium px-6 py-3 rounded-full hover:bg-sage-50 transition-colors"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </motion.div>
  )
}

function AlreadyCancelledState({ appointment }: { appointment: Appointment }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="show"
      className="text-center py-16"
    >
      <div className="w-14 h-14 bg-[#f0f5f0] rounded-full flex items-center justify-center text-2xl mx-auto mb-5">
        ℹ️
      </div>
      <p className="text-xs font-medium tracking-[0.2em] text-sage-500 uppercase mb-2">
        Already Cancelled
      </p>
      <h2 className="font-display text-3xl text-sage-800 mb-2">
        Appointment Was Cancelled
      </h2>
      <p className="font-display italic text-lg text-sage-500 mb-6">
        This appointment has already been cancelled.
      </p>
      
      <div className="bg-white border border-sage-100 rounded-xl p-5 text-left mb-8 max-w-md mx-auto">
        <p className="text-xs font-medium tracking-[0.2em] text-sage-500 uppercase mb-4">
          Appointment Details
        </p>
        {[
          { label: 'Name', value: appointment.name },
          { label: 'Date', value: formatDate(appointment.date) },
          { label: 'Slot', value: appointment.slot },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="flex justify-between items-start py-2.5 border-b border-sage-100 last:border-0"
          >
            <span className="text-xs text-sage-400 uppercase tracking-widest">
              {label}
            </span>
            <span className="font-display text-base text-sage-800 text-right">
              {value}
            </span>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <a
          href="/book"
          className="inline-flex items-center justify-center gap-2 bg-sage-600 text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-sage-700 transition-colors"
        >
          Book New Appointment
        </a>
        <div>
          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 border border-sage-300 text-sage-700 text-sm font-medium px-6 py-3 rounded-full hover:bg-sage-50 transition-colors"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </motion.div>
  )
}

function ReadyState({ 
  appointment, 
  selectedReason, 
  setSelectedReason, 
  onConfirm, 
  onKeep 
}: { 
  appointment: Appointment
  selectedReason: string
  setSelectedReason: (reason: string) => void
  onConfirm: () => void
  onKeep: () => void
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <div className="text-center">
        <p className="text-xs font-medium tracking-[0.2em] text-sage-500 uppercase mb-2">
          Confirm Cancellation
        </p>
        <h2 className="font-display text-4xl text-sage-800 mb-2">
          Cancel Appointment?
        </h2>
        <p className="font-display italic text-2xl text-sage-500">
          Please review before confirming.
        </p>
      </div>

      <div className="bg-white border border-sage-100 rounded-xl p-5">
        <p className="text-xs font-medium tracking-[0.2em] text-sage-500 uppercase mb-4">
          Appointment Details
        </p>
        {[
          { label: 'Name', value: appointment.name },
          { label: 'Phone', value: appointment.phone },
          { label: 'Age', value: `${appointment.age} years` },
          { label: 'Date', value: formatDate(appointment.date) },
          { label: 'Day Preference', value: appointment.day_preference || 'Any' },
          { label: 'Slot', value: appointment.slot },
          { label: 'Reason', value: appointment.reason || 'Not specified' },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="flex justify-between items-start py-2.5 border-b border-sage-100 last:border-0"
          >
            <span className="text-xs text-sage-400 uppercase tracking-widest shrink-0">
              {label}
            </span>
            <span className="font-display text-base text-sage-800 text-right ml-4">
              {value}
            </span>
          </div>
        ))}
      </div>

      <div className="bg-white border border-sage-100 rounded-xl p-5">
        <label className="text-xs font-medium tracking-[0.12em] uppercase text-sage-500 block mb-3">
          Reason for Cancellation
        </label>
        <select
          value={selectedReason}
          onChange={(e) => setSelectedReason(e.target.value)}
          className="w-full border border-sage-200 rounded-xl px-4 py-3 text-sm text-sage-800 bg-white focus:outline-none focus:ring-2 focus:ring-sage-300 focus:border-transparent transition-all"
        >
          <option value="">Please select a reason</option>
          {CANCEL_REASONS.map((reason) => (
            <option key={reason} value={reason}>
              {reason}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={onKeep}
          className="inline-flex items-center justify-center gap-2 border border-sage-300 text-sage-700 text-sm font-medium px-6 py-3 rounded-full hover:bg-sage-50 transition-colors"
        >
          Keep Appointment
        </button>
        <button
          onClick={onConfirm}
          disabled={!selectedReason}
          className="inline-flex items-center justify-center gap-2 bg-red-600 text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-red-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          Confirm Cancellation
        </button>
      </div>
    </motion.div>
  )
}

function DoneState({ appointment }: { appointment: Appointment }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="show"
      className="text-center py-16"
    >
      <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center text-2xl mx-auto mb-5">
        ✅
      </div>
      <p className="text-xs font-medium tracking-[0.2em] text-sage-500 uppercase mb-2">
        Cancellation Complete
      </p>
      <h2 className="font-display text-4xl text-sage-800 mb-2">
        Appointment Cancelled
      </h2>
      <p className="font-display italic text-2xl text-sage-500 mb-6">
        We&apos;ve updated your booking.
      </p>

      <div className="bg-white border border-sage-100 rounded-xl p-5 text-left mb-8 max-w-md mx-auto">
        <p className="text-xs font-medium tracking-[0.2em] text-sage-500 uppercase mb-4">
          Cancelled Appointment
        </p>
        {[
          { label: 'Name', value: appointment.name },
          { label: 'Date', value: formatDate(appointment.date) },
          { label: 'Slot', value: appointment.slot },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="flex justify-between items-start py-2.5 border-b border-sage-100 last:border-0"
          >
            <span className="text-xs text-sage-400 uppercase tracking-widest">
              {label}
            </span>
            <span className="font-display text-base text-sage-800 text-right">
              {value}
            </span>
          </div>
        ))}
      </div>

      <p className="text-sm text-sage-600 mb-8">
        A confirmation has been sent to&apos;{' '}
        <span className="font-medium text-sage-700">{appointment.phone}</span>
      </p>

      <div className="space-y-3">
        <a
          href="/book"
          className="inline-flex items-center justify-center gap-2 bg-sage-600 text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-sage-700 transition-colors"
        >
          Book New Appointment
        </a>
        <div>
          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 border border-sage-300 text-sage-700 text-sm font-medium px-6 py-3 rounded-full hover:bg-sage-50 transition-colors"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </motion.div>
  )
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="show"
      className="text-center py-16"
    >
      <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center text-2xl mx-auto mb-5">
        ⚠️
      </div>
      <p className="text-xs font-medium tracking-[0.2em] text-sage-500 uppercase mb-2">
        Something Went Wrong
      </p>
      <h2 className="font-display text-3xl text-sage-800 mb-2">
        Error Occurred
      </h2>
      <p className="font-display italic text-lg text-sage-500 mb-6">
        We couldn&apos;t process your request.
      </p>
      <p className="text-sm text-sage-600 mb-8">
        Please try again or call us directly for assistance.
      </p>
      <div className="space-y-3">
        <button
          onClick={onRetry}
          className="inline-flex items-center justify-center gap-2 bg-sage-600 text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-sage-700 transition-colors"
        >
          Try Again
        </button>
        <div className="space-y-2">
          <a
            href="tel:+918856819580"
            className="block inline-flex items-center justify-center gap-2 border border-sage-300 text-sage-700 text-sm font-medium px-6 py-3 rounded-full hover:bg-sage-50 transition-colors"
          >
            📞 Call Us: 8856819580
          </a>
          <a
            href="/"
            className="block inline-flex items-center justify-center gap-2 border border-sage-300 text-sage-700 text-sm font-medium px-6 py-3 rounded-full hover:bg-sage-50 transition-colors"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </motion.div>
  )
}

// ════════════════════════════════════════════════════════════════════════════
export default function CancelPage() {
  const searchParams = useSearchParams()
  const [state, setState] = useState<PageState>('loading')
  const [appointment, setAppointment] = useState<Appointment | null>(null)
  const [selectedReason, setSelectedReason] = useState('')
  const [error, setError] = useState('')

  const token = searchParams.get('token')

  // ─── LOAD APPOINTMENT ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!token) {
      setState('not_found')
      return
    }

    async function loadAppointment() {
      try {
        const { data, error } = await supabase
          .from('appointments')
          .select('*')
          .eq('cancel_token', token)
          .single()

        if (error || !data) {
          setState('not_found')
          return
        }

        setAppointment(data)

        if (data.status === 'cancelled') {
          setState('already_cancelled')
        } else {
          setState('ready')
        }
      } catch (err) {
        console.error('Error loading appointment:', err)
        setState('error')
      }
    }

    loadAppointment()
  }, [token])

  // ─── CONFIRM CANCELLATION ────────────────────────────────────────────────────
  async function handleConfirm() {
    if (!appointment || !selectedReason) return

    setState('confirming')
    setError('')

    try {
      // Update appointment status
      const { error: updateError } = await supabase
        .from('appointments')
        .update({ status: 'cancelled' })
        .eq('id', appointment.id)

      if (updateError) throw new Error(updateError.message)

      // Send cancellation email
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: appointment.name,
          phone: appointment.phone,
          age: appointment.age,
          date: formatDate(appointment.date),
          slot: appointment.slot,
          day_preference: appointment.day_preference || 'Any',
          reason: `CANCELLATION: ${selectedReason}`,
          cancel_link: 'N/A',
        },
        EMAILJS_PUBLIC_KEY,
      )

      setState('done')
    } catch (err) {
      console.error('Cancellation error:', err)
      setError('Failed to cancel appointment. Please try again.')
      setState('error')
    }
  }

  function handleRetry() {
    setState('loading')
    setSelectedReason('')
    setError('')
    // Reload the page
    window.location.reload()
  }

  function handleKeep() {
    // Navigate back to home
    window.location.href = '/'
  }

  // ─── RENDER STATE ───────────────────────────────────────────────────────────
  const renderState = () => {
    switch (state) {
      case 'loading':
        return <LoadingState />
      case 'confirming':
        return <LoadingState />
      case 'not_found':
        return <NotFoundState />
      case 'already_cancelled':
        return <AlreadyCancelledState appointment={appointment!} />
      case 'ready':
        return (
          <ReadyState
            appointment={appointment!}
            selectedReason={selectedReason}
            setSelectedReason={setSelectedReason}
            onConfirm={handleConfirm}
            onKeep={handleKeep}
          />
        )
      case 'done':
        return <DoneState appointment={appointment!} />
      case 'error':
        return <ErrorState onRetry={handleRetry} />
      default:
        return <NotFoundState />
    }
  }

  return (
    <main className="min-h-screen bg-[#faf7f2]">
      {/* ─── NAV ─── */}
      <Header ctaType="back" backHref="/" />

      {/* ─── DOCTOR STRIP ─── */}
      <DoctorInfoStrip />

      {/* ─── PAGE HEADING ─── */}
      <section className="max-w-5xl mx-auto px-6 pt-14 pb-8">
        <p className="text-xs font-medium tracking-[0.2em] text-sage-500 uppercase mb-2">
          Ashabi Clinic · Sangli
        </p>
        <h1 className="font-display text-5xl md:text-6xl text-sage-800 leading-tight mb-2">
          Cancel<br />Appointment
        </h1>
        <p className="font-display italic text-2xl text-sage-500">
          Manage your booking.
        </p>
      </section>

      {/* ─── CONTENT ─── */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <div className="max-w-xl mx-auto">
          {renderState()}
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <Footer />
    </main>
  )
}
