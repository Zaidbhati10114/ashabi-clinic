"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, Variants } from "framer-motion";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Appointment } from "@/types/appointment";
import { Id } from "@/convex/_generated/dataModel";
import { APPOINTMENT_STATUS } from "@/types/appointment-types";

type FilterStatus = "all" | "pending" | "confirmed" | "cancelled";

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
};

// ─── HELPER FUNCTIONS ───────────────────────────────────────────────────────────
function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getStatusColor(status: string) {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    case "confirmed":
      return "bg-green-100 text-green-700";
    case "cancelled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

// ─── COMPONENTS ───────────────────────────────────────────────────────────────
function StatsCard({
  label,
  value,
  icon,
  color = "blue",
}: {
  label: string;
  value: number;
  icon: string;
  color?: "blue" | "yellow" | "green" | "red";
}) {
  const bgColor =
    color === "blue"
      ? "bg-blue-100"
      : color === "yellow"
        ? "bg-yellow-100"
        : color === "green"
          ? "bg-green-100"
          : "bg-red-100";

  return (
    <div className="bg-white border border-blue-100 rounded-xl p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-3xl font-display text-blue-800">{value}</p>
          <p className="text-sm text-blue-600">{label}</p>
        </div>
        <div
          className={`w-12 h-12 ${bgColor} rounded-xl flex items-center justify-center text-2xl`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

function FilterTabs({
  activeFilter,
  onFilterChange,
}: {
  activeFilter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
}) {
  const filters: { value: FilterStatus; label: string }[] = [
    { value: "all", label: "All" },
    { value: "pending", label: "Pending" },
    { value: "confirmed", label: "Confirmed" },
    { value: "cancelled", label: "Cancelled" },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
            activeFilter === filter.value
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-blue-600 border-blue-200 hover:border-blue-400 hover:bg-blue-50"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

function DateRangeFilter({
  fromDate,
  toDate,
  onFromDateChange,
  onToDateChange,
}: {
  fromDate: string;
  toDate: string;
  onFromDateChange: (date: string) => void;
  onToDateChange: (date: string) => void;
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="flex-1">
        <label className="text-xs font-medium tracking-[0.12em] uppercase text-blue-500 block mb-1.5">
          From Date
        </label>
        <input
          type="date"
          value={fromDate}
          onChange={(e) => onFromDateChange(e.target.value)}
          className="w-full border border-blue-200 rounded-xl px-3 py-2 text-sm text-blue-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
        />
      </div>
      <div className="flex-1">
        <label className="text-xs font-medium tracking-[0.12em] uppercase text-blue-500 block mb-1.5">
          To Date
        </label>
        <input
          type="date"
          value={toDate}
          onChange={(e) => onToDateChange(e.target.value)}
          className="w-full border border-blue-200 rounded-xl px-3 py-2 text-sm text-blue-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
        />
      </div>
    </div>
  );
}

function AppointmentCard({
  appointment,
  onConfirm,
  onCancel,
}: {
  appointment: Appointment;
  onConfirm: (id: Id<"appointments">) => void;
  onCancel: (id: Id<"appointments">) => void;
}) {
  return (
    <motion.div
      variants={fadeUp}
      className="bg-white border border-blue-100 rounded-xl p-5"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-display text-xl text-blue-800 mb-1">
            {appointment.name}
          </h3>
          <p className="text-sm text-blue-600">
            {appointment.phone} • {appointment.age} years
          </p>
        </div>
        <StatusBadge status={appointment.status} />
      </div>

      <div className="space-y-2 text-sm text-blue-600 mb-4">
        <p className="flex items-center gap-2">
          📅 {formatDate(appointment.date)}
        </p>
        <p className="flex items-center gap-2">⏰ {appointment.slot}</p>
        {appointment.dayPreference && appointment.dayPreference !== "Any" && (
          <p className="flex items-center gap-2">
            📅 {appointment.dayPreference}
          </p>
        )}
        {appointment.reason && appointment.reason !== "Not specified" && (
          <p className="flex items-start gap-2">
            📝 <span className="line-clamp-2">{appointment.reason}</span>
          </p>
        )}
      </div>

      {appointment.status === APPOINTMENT_STATUS.PENDING && (
        <div className="flex gap-2">
          <button
            onClick={() => onConfirm(appointment._id)}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-blue-700 transition-colors"
          >
            ✓ Confirm
          </button>
          <button
            onClick={() => onCancel(appointment._id)}
            className="flex-1 inline-flex items-center justify-center gap-2 border border-blue-300 text-blue-700 text-sm font-medium px-4 py-2 rounded-full hover:bg-blue-50 transition-colors"
          >
            ✕ Cancel
          </button>
        </div>
      )}
    </motion.div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
export default function AdminDashboard() {
  const router = useRouter();

  const [activeFilter, setActiveFilter] = useState<FilterStatus>("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const appointments = useQuery(api.appointments.adminListAppointments);
  const appointmentList = appointments ?? [];
  const updateAppointmentStatus = useMutation(
    api.appointments.adminUpdateAppointmentStatus,
  );

  const filteredAppointments = useMemo(() => {
    let filtered = appointmentList;

    // Status filter
    if (activeFilter !== "all") {
      filtered = filtered.filter((apt) => apt.status === activeFilter);
    }

    // Date range filter
    if (fromDate) {
      filtered = filtered.filter((apt) => apt.date >= fromDate);
    }
    if (toDate) {
      filtered = filtered.filter((apt) => apt.date <= toDate);
    }

    return filtered;
  }, [appointmentList, activeFilter, fromDate, toDate]);

  // ─── ACTIONS ────────────────────────────────────────────────────────────────
  async function handleConfirm(id: Appointment["_id"]) {
    try {
      await updateAppointmentStatus({
        appointmentId: id,
        status: "confirmed",
      });
    } catch (error) {
      console.error("Error confirming appointment:", error);
    }
  }

  async function handleCancel(id: Appointment["_id"]) {
    try {
      await updateAppointmentStatus({
        appointmentId: id,
        status: "cancelled",
      });
    } catch (error) {
      console.error("Error cancelling appointment:", error);
    }
  }
  async function handleLogout() {
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
      });

      router.push("/admin/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  // ─── STATS CALCULATION ───────────────────────────────────────────────────────
  const stats = {
    total: appointmentList.length,
    pending: appointmentList.filter(
      (apt) => apt.status === APPOINTMENT_STATUS.PENDING,
    ).length,
    confirmed: appointmentList.filter(
      (apt) => apt.status === APPOINTMENT_STATUS.CONFIRMED,
    ).length,
    cancelled: appointmentList.filter(
      (apt) => apt.status === APPOINTMENT_STATUS.CANCELLED,
    ).length,
  };

  // ─── LOADING STATE ───────────────────────────────────────────────────────────
  if (appointments === undefined) {
    return (
      <main className="min-h-screen bg-sky">
        <div className="text-center py-32">
          <div className="w-14 h-14 bg-mist rounded-full flex items-center justify-center mx-auto mb-5">
            <svg
              className="animate-spin w-6 h-6 text-blue-600"
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
          <p className="text-sm text-blue-600">Loading dashboard...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-sky">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-sky/90 backdrop-blur-sm border-b border-blue-100">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl text-blue-800">
              Doctor Dashboard
            </h1>
            <p className="text-sm text-blue-600">Ashabi Clinic</p>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center justify-center gap-2 border border-blue-300 text-blue-700 text-sm font-medium px-4 py-2 rounded-full hover:bg-blue-50 transition-colors"
          >
            Sign Out →
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <StatsCard label="Total Appointments" value={stats.total} icon="📋" />
          <StatsCard
            label="Pending"
            value={stats.pending}
            icon="⏳"
            color="yellow"
          />
          <StatsCard
            label="Confirmed"
            value={stats.confirmed}
            icon="✓"
            color="blue"
          />
          <StatsCard
            label="Cancelled"
            value={stats.cancelled}
            icon="✕"
            color="red"
          />
        </motion.div>

        {/* Filters */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.1 }}
          className="bg-white border border-blue-100 rounded-xl p-5 mb-6"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <p className="text-xs font-medium tracking-[0.12em] uppercase text-blue-500 mb-3">
                Status Filter
              </p>
              <FilterTabs
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
              />
            </div>
            <div className="lg:w-80">
              <p className="text-xs font-medium tracking-[0.12em] uppercase text-blue-500 mb-3">
                Date Range
              </p>
              <DateRangeFilter
                fromDate={fromDate}
                toDate={toDate}
                onFromDateChange={setFromDate}
                onToDateChange={setToDate}
              />
            </div>
          </div>
        </motion.div>

        {/* Appointments List */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-medium tracking-[0.12em] uppercase text-blue-500">
              Showing {filteredAppointments.length} appointment
              {filteredAppointments.length !== 1 ? "s" : ""}
            </p>
          </div>

          {filteredAppointments.length === 0 ? (
            <div className="bg-white border border-blue-100 rounded-xl p-8 text-center">
              <p className="text-blue-500">No appointments found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment._id}
                  appointment={appointment}
                  onConfirm={handleConfirm}
                  onCancel={handleCancel}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
}
