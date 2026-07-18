

import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { APPOINTMENT_STATUS } from '../types/appointment-types';


export const publicCreateAppointment = mutation({
  args: {
    name: v.string(),
    phone: v.string(),
    age: v.number(),

    date: v.string(),
    dayPreference: v.union(
      v.literal("Any"),
      v.literal("Mon"),
      v.literal("Tue"),
      v.literal("Wed"),
      v.literal("Thu"),
      v.literal("Fri"),
      v.literal("Sat"),
      v.literal("Sun")
    ),
    slot: v.union(
      v.literal("morning"),
      v.literal("evening")
    ),

    reason: v.string(),
  },

  handler: async (ctx, args) => {
    const now = Date.now();
    const cancelToken = crypto.randomUUID().replace(/-/g, "");

    const id = await ctx.db.insert("appointments", {
      name: args.name.trim(),
      phone: args.phone.trim(),
      age: args.age,

      date: args.date,
      dayPreference: args.dayPreference,
      slot: args.slot,

      reason: args.reason.trim() || "Not specified",

      status: "pending",

      cancelToken,

      createdAt: now,
      updatedAt: now,
    });

    return {
      appointmentId: id,
      cancelToken,
    };
  },
});


export const publicGetAppointmentByCancelToken = query({
  args: {
    cancelToken: v.string(),
  },

  handler: async (ctx, args) => {
    const appointment = await ctx.db
      .query("appointments")
      .withIndex("by_cancel_token", (q) =>
        q.eq("cancelToken", args.cancelToken)
      )
      .unique();

    return appointment;
  },
});

export const publicCancelAppointment = mutation({
  args: {
    cancelToken: v.string(),
    cancelReason: v.string(),
  },

  handler: async (ctx, args) => {
    const appointment = await ctx.db
      .query("appointments")
      .withIndex("by_cancel_token", (q) =>
        q.eq("cancelToken", args.cancelToken)
      )
      .unique();


    if (!appointment) {
      throw new Error("Appointment not found");
    }

    if (appointment.status === APPOINTMENT_STATUS.CANCELLED) {
      return {
        success: true,
        alreadyCancelled: true,
      };
    }

    await ctx.db.patch(appointment._id, {
      status: APPOINTMENT_STATUS.CANCELLED,
      cancelReason: args.cancelReason,
      cancelledAt: Date.now(),
      updatedAt: Date.now(),
    });

    return {
      success: true,
      alreadyCancelled: false
    };
  },
});


// Admin 

export const adminListAppointments = query({
  args: {},

  handler: async (ctx) => {
    return await ctx.db
      .query("appointments")
      .withIndex("by_created_at")
      .order("desc")
      .collect();
  },
});


export const adminUpdateAppointmentStatus = mutation({
  args: {
    appointmentId: v.id("appointments"),
    status: v.union(
      v.literal("pending"),
      v.literal("confirmed"),
      v.literal("completed"),
      v.literal("cancelled")
    ),
  },

  handler: async (ctx, args) => {
    await ctx.db.patch(args.appointmentId, {
      status: args.status,
      updatedAt: Date.now(),
    });

    return {
      success: true,
    };
  },
});