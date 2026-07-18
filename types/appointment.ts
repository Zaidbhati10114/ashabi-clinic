import { Id } from "../convex/_generated/dataModel";

import {
    AppointmentStatus,
    DayPreference,
    Slot,
} from "./appointment-types";

export interface Appointment {
    _id: Id<"appointments">;

    name: string;
    phone: string;
    age: number;

    date: string;
    dayPreference: DayPreference;
    slot: Slot;

    reason: string;

    status: AppointmentStatus;

    cancelToken: string;

    createdAt: number;
    updatedAt: number;

    cancelReason?: string;
    cancelledAt?: number;
}