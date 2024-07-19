import { ConvexError, v } from "convex/values";

import { internalMutation, query } from "./_generated/server";

export const getUserById = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    return user;
  },
});

// this query is used to get the top user by tale count. first the tale is sorted by views and then the user is sorted by total tales, so the user with the most tales will be at the top.
export const getTopUserByTaleCount = query({
  args: {},
  handler: async (ctx, args) => {
    const user = await ctx.db.query("users").collect();

    const userData = await Promise.all(
      user.map(async (u) => {
        const tales = await ctx.db
          .query("tales")
          .filter((q) => q.eq(q.field("authorId"), u.clerkId))
          .collect();

        const sortedTales = tales.sort((a, b) => b.views - a.views);

        return {
          ...u,
          totalTales: tales.length,
          tale: sortedTales.map((p) => ({
            taleTitle: p.taleTitle,
            taleId: p._id,
          })),
        };
      })
    );

    return userData.sort((a, b) => b.totalTales - a.totalTales);
  },
});

export const getAuthorsBySearch = query({
  args: {
    search: v.string(),
  },
  handler: async (ctx, args) => {
    let users = [];

    if (args.search === "") {
      users = await ctx.db.query("users").collect();
    } else {
      users = await ctx.db
        .query("users")
        .withSearchIndex("search_name", (q) => q.search("name", args.search))
        .collect();
    }

    const userData = await Promise.all(
      users.map(async (u) => {
        const tales = await ctx.db
          .query("tales")
          .filter((q) => q.eq(q.field("authorId"), u.clerkId))
          .collect();

        return {
          ...u,
          totalTales: tales.length,
        };
      })
    );

    // Sort userData alphabetically by the authors' names
    const sortedUserData = userData.sort((a, b) => a.name.localeCompare(b.name));

    return { results: sortedUserData };
  },
});

export const createUser = internalMutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    imageUrl: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("users", {
      clerkId: args.clerkId,
      email: args.email,
      imageUrl: args.imageUrl,
      name: args.name,
    });
  },
});

export const updateUser = internalMutation({
  args: {
    clerkId: v.string(),
    imageUrl: v.string(),
    email: v.string(),
  },
  async handler(ctx, args) {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    await ctx.db.patch(user._id, {
      imageUrl: args.imageUrl,
      email: args.email,
    });

    const tale = await ctx.db
      .query("tales")
      .filter((q) => q.eq(q.field("authorId"), args.clerkId))
      .collect();

    await Promise.all(
      tale.map(async (p) => {
        await ctx.db.patch(p._id, {
          authorImageUrl: args.imageUrl,
        });
      })
    );
  },
});

export const deleteUser = internalMutation({
  args: { clerkId: v.string() },
  async handler(ctx, args) {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    await ctx.db.delete(user._id);
  },
});