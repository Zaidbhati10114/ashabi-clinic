import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  appointments: defineTable({
    name: v.string(),
    phone: v.string(),
    age: v.number(),

    date: v.string(),
    dayPreference: v.string(),
    slot: v.string(),

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