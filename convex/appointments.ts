

import { mutation,query } from "./_generated/server";
import { v } from "convex/values";

export const publicCreateAppointment = mutation({
  args: {
    name: v.string(),
    phone: v.string(),
    age: v.number(),

    date: v.string(),
    dayPreference: v.string(),
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
      dayPreference: args.dayPreference || "Any",
      slot: args.slot,

      reason: args.reason.trim() || "Not specified",

      status: "pending",

      cancelToken,

      createdAt: now,
      updatedAt: now,
    });

    return {
      appointmentId:id,
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

    if (appointment.status === "cancelled") {
  return {
    success: true,
    alreadyCancelled: true,
  };
}

    await ctx.db.patch(appointment._id, {
      status: "cancelled",
      cancelReason: args.cancelReason,
      cancelledAt: Date.now(),
      updatedAt: Date.now(),
    });

    return {
      success: true,
      alreadyCancelled:false
    };
  },
});