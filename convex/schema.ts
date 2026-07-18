import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  appointments: defineTable({
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

    status: v.union(
      v.literal("pending"),
      v.literal("confirmed"),
      v.literal("completed"),
      v.literal("cancelled")
    ),

    cancelToken: v.string(),

    createdAt: v.number(),
    updatedAt: v.number(),

    cancelReason: v.optional(v.string()),
    cancelledAt: v.optional(v.number()),
  })
    .index("by_cancel_token", ["cancelToken"])
    .index("by_status", ["status"])
    .index("by_date", ["date"])
    .index("by_created_at", ["createdAt"])
    .index("by_phone", ["phone"]),
});