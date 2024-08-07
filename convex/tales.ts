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
        likesCount: 0, 
        dislikesCount: 0, 
        likedBy: [], 
        dislikedBy: [] 
    })

    return tale;

    }
})

export const likeTale = mutation({
  args: {
    taleId: v.id("tales"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("User not authenticated");
    }

    const user = await ctx.db.query("users").filter((q) => q.eq(q.field("email"), identity.email)).collect();

    if (user.length === 0) {
      throw new ConvexError('User not found');
    }

    const tale = await ctx.db.get(args.taleId);

    if (!tale) {
      throw new ConvexError("Tale not found");
    }

    if (!tale.likedBy.includes(user[0].clerkId)) {
      await ctx.db.patch(args.taleId, {
        likesCount: tale.likesCount + 1,
        likedBy: [...tale.likedBy, user[0].clerkId],
        dislikesCount: tale.dislikesCount - (tale.dislikedBy.includes(user[0].clerkId) ? 1 : 0),
        dislikedBy: tale.dislikedBy.filter(id => id !== user[0].clerkId),
      });
    }
  }
});

export const dislikeTale = mutation({
  args: {
    taleId: v.id("tales"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("User not authenticated");
    }

    const user = await ctx.db.query("users").filter((q) => q.eq(q.field("email"), identity.email)).collect();

    if (user.length === 0) {
      throw new ConvexError('User not found');
    }

    const tale = await ctx.db.get(args.taleId);

    if (!tale) {
      throw new ConvexError("Tale not found");
    }

    if (!tale.dislikedBy.includes(user[0].clerkId)) {
      await ctx.db.patch(args.taleId, {
        dislikesCount: tale.dislikesCount + 1,
        dislikedBy: [...tale.dislikedBy, user[0].clerkId],
        likesCount: tale.likesCount - (tale.likedBy.includes(user[0].clerkId) ? 1 : 0),
        likedBy: tale.likedBy.filter(id => id !== user[0].clerkId),
      });
    }
  }
});

export const getUserReaction = query({
  args: {
    taleId: v.id("tales"),
    clerkId: v.string(),
  },
  handler: async (ctx, { taleId, clerkId }) => {
    const tale = await ctx.db.get(taleId);
    if (!tale) {
      throw new Error("Tale not found");
    }
    
    const hasLiked = tale.likedBy.includes(clerkId);
    const hasDisliked = tale.dislikedBy.includes(clerkId);
    
    if (hasLiked) return "like";
    if (hasDisliked) return "dislike";
    return null;
  }
});

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
      // Optional page parameters
      page: v.optional(v.number()),  
      sort: v.optional(v.string()),  
    },
    handler: async (ctx, args) => {
      const pageSize = 8;  // Hardcoded page size
      const page = args.page || 1;  // Default to 1 if page is not provided
      const sort = args.sort || "date"; // Default sort to "date" if not provided

      let results = [];
  
      if (args.search === "") {
        results = await ctx.db.query("tales").order("desc").collect();
      } else {
        const authorSearch = await ctx.db
          .query("tales")
          .withSearchIndex("search_author", (q) => q.search("author", args.search))
          .collect();  // Collect all results
        
        if (authorSearch.length > 0) {
          results = authorSearch;
        } else {
          const titleSearch = await ctx.db
            .query("tales")
            .withSearchIndex("search_title", (q) =>
              q.search("taleTitle", args.search)
            )
            .collect();  // Collect all results
          
          if (titleSearch.length > 0) {
            results = titleSearch;
          } else {
            const bodySearch = await ctx.db
              .query("tales")
              .withSearchIndex("search_body", (q) =>
                q.search("taleDescription" || "taleTitle", args.search)
              )
              .collect();  // Collect all results
            
            results = bodySearch;
          }
        }
      }

      // Sort the results based on the sort parameter
      if (sort === "date") {
        results.sort((a, b) => b._creationTime - a._creationTime); // Sort by creation time descending
      } else if (sort === "views") {
        results.sort((a, b) => b.views - a.views); // Sort by views descending
      } else if (sort === "AZ") {
        results.sort((a, b) => a.taleTitle.localeCompare(b.taleTitle)); // Sort by title A-Z
      } else if (sort === "ZA") {
        results.sort((a, b) => b.taleTitle.localeCompare(a.taleTitle)); // Sort by title Z-A
      }

      // Calculate total count of results
      const totalCount = results.length;
  
      if (results.length <= pageSize || !args.page) {
        return { results: results, totalCount: results.length };  // Return all results if less than or equal to pageSize or if no page param is provided
      }
  
      // Paginate the results
      const startIndex = (page - 1) * pageSize;
      const paginatedResults = results.slice(startIndex, startIndex + pageSize);
  
      return { results: paginatedResults, totalCount };
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

  export const editTale = mutation({
    args: {
      taleId: v.id("tales"),
      taleTitle: v.string(),
      taleDescription: v.string(),
    },
    handler: async (ctx, args) => {
      const tale = await ctx.db.get(args.taleId);
  
      if (!tale) {
        throw new ConvexError("Tale not found");
      }
  
      return await ctx.db.patch(args.taleId, {
        taleTitle: args.taleTitle,
        taleDescription: args.taleDescription,
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