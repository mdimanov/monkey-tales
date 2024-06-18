import { ConvexError, v } from "convex/values"
import { mutation, query } from "./_generated/server"

export const getUrl = mutation({
    args: {
        storageId: v.id("_storage")
    },
    handler: async (ctx, args) => {
        return await ctx.storage.getUrl(args.storageId)
    }
})

export const createTale = mutation({
    args: {
        taleTitle: v.string(),
        taleDescription: v.string(),
        audioUrl: v.string(),
        imageUrl: v.string(),
        voicePrompt: v.string(),
        imagePrompt: v.string(),
        voiceType: v.string(),
        views: v.number(),
        audioDuration: v.number(),
        audioStorageId: v.id("_storage"),
        imageStorageId: v.id("_storage"),
    },
    handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("User not authenticated");
    }

    const user = await ctx.db.query("users").filter((q) => q.eq(q.field("email"), identity.email)).collect();

    if(user.length === 0 ){
        throw new ConvexError('User not found')
    }

    const tale = await ctx.db.insert('tales', {
        ...args,
        user: user[0]._id,
        author: user[0].name,
        authorId: user[0].clerkId,
        authorImageUrl: user[0].imageUrl,
    })

    return tale;

    }
})

export const getTrendingTales = query({
    handler: async (ctx) => {
       const tales = await ctx.db.query('tales').collect();
       return tales;
    }
})