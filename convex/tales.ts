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

export const getTales = query({
    handler: async (ctx) => {
       const tales = await ctx.db.query('tales').collect();
       return tales;
    }
})

export const getTopTalesByViews = query({
  args: {
    numTales: v.number(),
  },
  handler: async (ctx, { numTales }) => {
    const tales = await ctx.db.query('tales').collect();
    const sortedTales = tales.sort((a, b) => b.views - a.views);
    const topTales = sortedTales.slice(0, numTales);
    return topTales;
  }
});

export const getTalesById = query({
    args: {
        taleId: v.id('tales')
    },
    handler: async (ctx, args) => {
      return await ctx.db.get(args.taleId);
    }
})

export const getTaleByVoiceType = query({
    args: {
      taleId: v.id("tales"),
    },
    handler: async (ctx, args) => {
      const tale = await ctx.db.get(args.taleId);
  
      return await ctx.db
        .query("tales")
        .filter((q) =>
          q.and(
            q.eq(q.field("voiceType"), tale?.voiceType),
            q.neq(q.field("_id"), args.taleId)
          )
        )
        .collect();
    },
  });
  
  export const getAllTales = query({
    args: {
      numTales: v.optional(v.number()),
    },
    handler: async (ctx, { numTales }) => {
      const tales = await ctx.db.query("tales").order("desc").collect();
      if (numTales !== undefined) {
        return tales.slice(0, numTales);
      }
      return tales;
    },
  });

  
export const getTaleByAuthorId = query({
    args: {
      authorId: v.string(),
    },
    handler: async (ctx, args) => {
      const tales = await ctx.db
        .query("tales")
        .filter((q) => q.eq(q.field("authorId"), args.authorId))
        .collect();
  
      const totalListeners = tales.reduce(
        (sum, tale) => sum + tale.views,
        0
      );
  
      return { tales, listeners: totalListeners };
    },
  });

  export const getTaleBySearch = query({
    args: {
      search: v.string(),
    },
    handler: async (ctx, args) => {
      if (args.search === "") {
        return await ctx.db.query("tales").order("desc").collect();
      }
  
      const authorSearch = await ctx.db
        .query("tales")
        .withSearchIndex("search_author", (q) => q.search("author", args.search))
        .take(3);
  
      if (authorSearch.length > 0) {
        return authorSearch;
      }
  
      const titleSearch = await ctx.db
        .query("tales")
        .withSearchIndex("search_title", (q) =>
          q.search("taleTitle", args.search)
        )
        .take(3);
  
      if (titleSearch.length > 0) {
        return titleSearch;
      }
  
      return await ctx.db
        .query("tales")
        .withSearchIndex("search_body", (q) =>
          q.search("taleDescription" || "taleTitle", args.search)
        )
        .take(3);
    },
  });

  export const updateTaleViews = mutation({
    args: {
      taleId: v.id("tales"),
    },
    handler: async (ctx, args) => {
      const tale = await ctx.db.get(args.taleId);
  
      if (!tale) {
        throw new ConvexError("Tale not found");
      }
  
      return await ctx.db.patch(args.taleId, {
        views: tale.views + 1,
      });
    },
  });

  export const deleteTale = mutation({
    args: {
      taleId: v.id("tales"),
      imageStorageId: v.id("_storage"),
      audioStorageId: v.id("_storage"),
    },
    handler: async (ctx, args) => {
      const tale = await ctx.db.get(args.taleId);
  
      if (!tale) {
        throw new ConvexError("Tale not found");
      }
  
      await ctx.storage.delete(args.imageStorageId);
      await ctx.storage.delete(args.audioStorageId);
      return await ctx.db.delete(args.taleId);
    },
  });