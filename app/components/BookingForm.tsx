"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

import { DayPreference } from "@/types/appointment-types";

// ─────────────────────────────────────────────────────────────────────────────

const SLOTS = [
  { id: "morning", label: "Morning", time: "9:00 AM – 12:00 PM", icon: "🌤️" },
  { id: "evening", label: "Evening", time: "5:00 PM – 8:00 PM", icon: "🌆" },
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const STEPS = ["Personal Info", "Schedule", "Reason", "Review"];

type FormData = {
  name: string;
  phone: string;
  email: string;
  age: string;
  date: string;
  dayPreference: DayPreference | "";
  slot: "morning" | "evening" | "";
  reason: string;
};

const initial: FormData = {
  name: "",
  phone: "",
  age: "",
  date: "",
  dayPreference: "",
  slot: "",
  reason: "",
  email: "",
};

// Matches landing page fadeUp exactly
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
};

const slideVariants: Variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 32 : -32 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut" } },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? -32 : 32,
    transition: { duration: 0.25, ease: "easeIn" },
  }),
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
function getTodayString() {
  return new Date().toISOString().split("T")[0];
}

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

// ─── Step Indicator ───────────────────────────────────────────────────────────
function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-start justify-between mb-10">
      {STEPS.map((label, i) => (
        <div key={label} className="flex items-center flex-1">
          <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300 ${
                i < current
                  ? "bg-sage-600 text-white"
                  : i === current
                    ? "bg-sage-700 text-white ring-4 ring-sage-100"
                    : "bg-white border border-sage-200 text-sage-400"
              }`}
            >
              {i < current ? "✓" : i + 1}
            </div>
            <span
              className={`text-[10px] font-medium tracking-[0.12em] uppercase hidden sm:block ${
                i === current ? "text-sage-600" : "text-sage-300"
              }`}
            >
              {label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className={`flex-1 h-px mx-2 mb-5 transition-all duration-500 ${
                i < current ? "bg-sage-600" : "bg-sage-100"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Field wrapper ────────────────────────────────────────────────────────────
function Field({
  label,
  error,
  hint,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5 overflow-visible">
      <label className="text-xs font-medium tracking-[0.12em] uppercase text-sage-500">
        {label}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-sage-300">{hint}</p>}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

// ─── Input ────────────────────────────────────────────────────────────────────
function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full border border-sage-200 rounded-xl px-4 py-3 text-sm text-sage-800 bg-white placeholder:text-sage-300 focus:outline-none focus:ring-2 focus:ring-sage-300 focus:border-transparent transition-all ${
        props.className ?? ""
      }`}
    />
  );
}

// ════════════════════════════════════════════════════════════════════════════
function BookingForm() {
  type FormErrors = Partial<Record<keyof FormData, string>>;
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [data, setData] = useState<FormData>(initial);
  const [errors, setErrors] = useState<Partial<FormErrors>>({});
  const [loading, setLoading] = useState(false); // ← NEW
  const [submitted, setSubmitted] = useState(false);
  const [sendError, setSendError] = useState(""); // ← NEW

  const set = (field: keyof FormData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  function validate() {
    const e: Partial<FormErrors> = {};
    if (step === 0) {
      if (!data.name.trim()) e.name = "Name is required";
      if (!data.phone.trim() || !/^\d{10}$/.test(data.phone.trim()))
        e.phone = "Enter a valid 10-digit phone number";
      if (!data.email.trim()) {
        e.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
        e.email = "Enter a valid email address";
      }
      if (!data.age.trim() || isNaN(Number(data.age)) || Number(data.age) < 1)
        e.age = "Enter a valid age";
    }
    if (step === 1) {
      if (!data.date) e.date = "Please pick a date";
      if (!data.slot) e.slot = "Please select a time slot";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next() {
    if (!validate()) return;
    setDir(1);
    setStep((s) => s + 1);
  }

  function back() {
    setDir(-1);
    setStep((s) => s - 1);
  }

  async function confirm() {
    setLoading(true);
    setSendError("");

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          email: data.email,
          age: Number(data.age),
          date: data.date,
          dayPreference: data.dayPreference || "Any",
          slot: data.slot,
          reason: data.reason || "Not specified",
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      setSubmitted(true);
    } catch (err) {
      console.error(err);

      setSendError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  // ─── Loading screen ───────────────────────────────────────────────────────
  if (loading) {
    return (
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="text-center py-16"
      >
        <div className="w-14 h-14 bg-[#f0f5f0] rounded-full flex items-center justify-center mx-auto mb-5">
          <svg
            className="animate-spin w-6 h-6 text-sage-600"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
        </div>
        <p className="text-xs font-medium tracking-[0.2em] text-sage-500 uppercase mb-2">
          Please wait
        </p>
        <h2 className="font-display text-3xl text-sage-800 mb-2">
          Sending your request…
        </h2>
        <p className="font-display italic text-lg text-sage-400">
          This will only take a second.
        </p>
      </motion.div>
    );
  }

  // ─── Success Screen ───────────────────────────────────────────────────────
  if (submitted) {
    return (
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="text-center py-8"
      >
        <div className="w-14 h-14 bg-[#f0f5f0] rounded-full flex items-center justify-center text-2xl mx-auto mb-5">
          ✅
        </div>
        <p className="text-xs font-medium tracking-[0.2em] text-sage-500 uppercase mb-2">
          Request Received
        </p>
        <h2 className="font-display text-4xl text-sage-800 mb-2">
          Booking Confirmed!
        </h2>
        <p className="font-display italic text-xl text-sage-500 mb-6">
          We&apos;ll be in touch shortly.
        </p>
        <p className="text-sm text-sage-500 mb-8">
          Confirmation will be sent to {data.email}
          <span className="font-medium text-sage-700">{data.phone}</span>
        </p>

        <div className="bg-white border border-sage-100 rounded-xl p-5 text-left mb-8 space-y-0">
          <p className="text-xs font-medium tracking-[0.2em] text-sage-500 uppercase mb-4">
            Booking Summary
          </p>
          {[
            { label: "Name", value: data.name },
            { label: "Date", value: formatDate(data.date) },
            {
              label: "Slot",
              value:
                (SLOTS.find((s) => s.id === data.slot)?.label ?? "") +
                " · " +
                (SLOTS.find((s) => s.id === data.slot)?.time ?? ""),
            },
            { label: "Day Preference", value: data.dayPreference || "Any" },
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

        <a
          href="/"
          className="inline-flex items-center justify-center gap-2 bg-sage-600 text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-sage-700 transition-colors"
        >
          ← Back to Home
        </a>
      </motion.div>
    );
  }

  // ─── Form Steps ───────────────────────────────────────────────────────────
  const steps = [
    // STEP 0 — Personal Info
    <div key="step0" className="space-y-5">
      <div className="mb-6">
        <p className="text-xs font-medium tracking-[0.2em] text-sage-500 uppercase mb-2">
          Step 1 of 4
        </p>
        <h2 className="font-display text-4xl text-sage-800 mb-1">
          Personal Info
        </h2>
        <p className="text-sm text-sage-500">
          Tell us a little about yourself.
        </p>
      </div>
      <Field label="Full Name" error={errors.name}>
        <Input
          type="text"
          placeholder="e.g. Fatima Shaikh"
          value={data.name}
          onChange={(e) => set("name", e.target.value)}
        />
      </Field>
      <Field label="Email" error={errors.email}>
        <Input
          type="email"
          placeholder="patient@gmail.com"
          value={data.email}
          onChange={(e) => set("email", e.target.value)}
        />
      </Field>
      <Field label="Phone Number" error={errors.phone}>
        <Input
          type="tel"
          placeholder="10-digit mobile number"
          value={data.phone}
          onChange={(e) => set("phone", e.target.value)}
          maxLength={10}
        />
      </Field>
      <Field label="Age" error={errors.age}>
        <Input
          type="number"
          placeholder="Your age"
          value={data.age}
          onChange={(e) => set("age", e.target.value)}
          min={1}
          max={120}
        />
      </Field>
    </div>,

    // STEP 1 — Schedule
    <div key="step1" className="space-y-5">
      <div className="mb-6">
        <p className="text-xs font-medium tracking-[0.2em] text-sage-500 uppercase mb-2">
          Step 2 of 4
        </p>
        <h2 className="font-display text-4xl text-sage-800 mb-1">Schedule</h2>
        <p className="text-sm text-sage-500">
          Pick your preferred date and time slot.
        </p>
      </div>

      <Field label="Preferred Date" error={errors.date}>
        <Input
          type="date"
          value={data.date}
          min={getTodayString()}
          onChange={(e) => set("date", e.target.value)}
        />
      </Field>

      <Field label="Day Preference" hint="Optional — skip if any day works">
        <div className="flex flex-wrap gap-2">
          {DAYS.map((day) => (
            <button
              key={day}
              type="button"
              onClick={() =>
                set("dayPreference", data.dayPreference === day ? "" : day)
              }
              className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                data.dayPreference === day
                  ? "bg-sage-600 text-white border-sage-600"
                  : "bg-white text-sage-600 border-sage-200 hover:border-sage-400 hover:bg-sage-50"
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </Field>

      <Field label="Time Slot" error={errors.slot}>
        <div className="grid grid-cols-2 gap-3">
          {SLOTS.map((slot) => (
            <button
              key={slot.id}
              type="button"
              onClick={() => set("slot", slot.id)}
              className={`flex flex-col items-center gap-1.5 p-4 rounded-xl border transition-all ${
                data.slot === slot.id
                  ? "border-sage-600 bg-[#f0f5f0] text-sage-700 shadow-sm"
                  : "border-sage-100 bg-white text-sage-500 hover:border-sage-300 hover:shadow-sm"
              }`}
            >
              <span className="text-2xl">{slot.icon}</span>
              <span className="font-medium text-sm text-sage-800">
                {slot.label}
              </span>
              <span className="text-xs text-sage-400">{slot.time}</span>
            </button>
          ))}
        </div>
      </Field>
    </div>,

    // STEP 2 — Reason
    <div key="step2" className="space-y-5">
      <div className="mb-6">
        <p className="text-xs font-medium tracking-[0.2em] text-sage-500 uppercase mb-2">
          Step 3 of 4
        </p>
        <h2 className="font-display text-4xl text-sage-800 mb-1">
          Reason for Visit
        </h2>
        <p className="text-sm text-sage-500">
          Briefly describe your symptoms or concern.
        </p>
      </div>
      <Field
        label="Symptoms / Reason"
        hint="Optional — helps the doctor prepare for your visit."
      >
        <textarea
          rows={5}
          placeholder="e.g. Fever and cold since 3 days, recurring headache..."
          value={data.reason}
          onChange={(e) => set("reason", e.target.value)}
          className="w-full border border-sage-200 rounded-xl px-4 py-3 text-sm text-sage-800 bg-white placeholder:text-sage-300 focus:outline-none focus:ring-2 focus:ring-sage-300 focus:border-transparent transition-all resize-none"
        />
      </Field>
    </div>,

    // STEP 3 — Review
    <div key="step3" className="space-y-5">
      <div className="mb-6">
        <p className="text-xs font-medium tracking-[0.2em] text-sage-500 uppercase mb-2">
          Step 4 of 4
        </p>
        <h2 className="font-display text-4xl text-sage-800 mb-1">
          Review & Confirm
        </h2>
        <p className="text-sm text-sage-500">
          Check your details before confirming.
        </p>
      </div>

      <div className="bg-white border border-sage-100 rounded-xl p-5">
        {[
          { label: "Name", value: data.name },
          { label: "Phone", value: data.phone },
          { label: "Age", value: data.age + " years" },
          { label: "Date", value: formatDate(data.date) },
          { label: "Day Preference", value: data.dayPreference || "Any" },
          {
            label: "Slot",
            value: (() => {
              const s = SLOTS.find((s) => s.id === data.slot);
              return s ? `${s.label} · ${s.time}` : "";
            })(),
          },
          { label: "Reason", value: data.reason || "Not specified" },
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

      <p className="text-xs text-sage-400 text-center leading-relaxed">
        We&apos;ll receive your request and confirm your slot shortly.
      </p>

      {/* ─── Error message — only shows if EmailJS fails ─── */}
      {sendError && (
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-center">
          <p className="text-xs text-red-500 mb-1">{sendError}</p>
          <a
            href="tel:+919880919789"
            className="text-xs font-medium text-sage-600 underline"
          >
            Or call us directly: 98809 19789
          </a>
        </div>
      )}
    </div>,
  ];

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="w-full">
      <StepIndicator current={step} />

      <div className="relative">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={step}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            {steps[step]}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-between items-center mt-8 gap-3">
        {step > 0 ? (
          <a
            onClick={back}
            className="inline-flex items-center justify-center gap-2 border border-sage-300 text-sage-700 text-sm font-medium px-6 py-3 rounded-full hover:bg-sage-50 transition-colors cursor-pointer"
          >
            ← Back
          </a>
        ) : (
          <div />
        )}

        {step < STEPS.length - 1 ? (
          <button
            onClick={next}
            className="inline-flex items-center justify-center gap-2 bg-sage-600 text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-sage-700 transition-colors"
          >
            Continue →
          </button>
        ) : (
          <button
            onClick={confirm}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 bg-sage-600 text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-sage-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            Confirm Booking →
          </button>
        )}
      </div>
    </div>
  );
}

export default BookingForm;
