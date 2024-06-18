import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    tales: defineTable({
        user: v.id('users'),
        taleTitle: v.string(),
        taleDescription: v.string(),
        audioUrl: v.string(),
        audioStorageId: v.optional(v.id('_storage')),
        imageUrl: v.string(),
        imageStorageId: v.optional(v.id('_storage')),
        author: v.string(),
        authorId: v.string(),
        authorImageUrl: v.string(),
        voicePrompt: v.string(),
        imagePrompt: v.string(),
        voiceType: v.string(),
        audioDuration: v.number(),
        views: v.number(),
    })
    .searchIndex('search_author', { searchField: 'author' })
    .searchIndex('search_title', { searchField: 'taleTitle' })
    .searchIndex('search_body', { searchField: 'taleDescription' }),
    users: defineTable({
        email: v.string(),
        imageUrl: v.string(),
        clerkId: v.string(),
        name: v.string(),
    })
})