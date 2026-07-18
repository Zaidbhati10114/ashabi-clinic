export const APPOINTMENT_STATUS = {
    PENDING: "pending",
    CONFIRMED: "confirmed",
    COMPLETED: "completed",
    CANCELLED: "cancelled",
} as const;

export type AppointmentStatus =
    (typeof APPOINTMENT_STATUS)[keyof typeof APPOINTMENT_STATUS];

export const SLOT = {
    MORNING: "morning",
    EVENING: "evening",
} as const;

export type Slot = (typeof SLOT)[keyof typeof SLOT];

export const DAY_PREFERENCE = {
    ANY: "Any",
    MON: "Mon",
    TUE: "Tue",
    WED: "Wed",
    THU: "Thu",
    FRI: "Fri",
    SAT: "Sat",
    SUN: "Sun",
} as const;

export type DayPreference =
    (typeof DAY_PREFERENCE)[keyof typeof DAY_PREFERENCE];