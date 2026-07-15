

import { mutation } from "./_generated/server";
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