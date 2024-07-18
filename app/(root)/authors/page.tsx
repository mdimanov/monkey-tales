"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import AuthorSmallCardSkeleton from "@/app/components/AuthorSmallCardSkeleton";
import SmallProfileCard from "@/app/components/SmallProfileCard";

const Authors = () => {
  const topTaleTellers = useQuery(api.users.getTopUserByTaleCount);

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <h1 className="main_title">Authors</h1>
      <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-3">
        {false ? (
          topTaleTellers
            .slice(0, 6)
            .map((taleTeller) => (
              <SmallProfileCard
                key={taleTeller._id}
                imageUrl={taleTeller?.imageUrl!}
                userFirstName={taleTeller?.name!}
                tales={taleTeller.tale.length}
                clerkId={taleTeller.clerkId}
              />
            ))
        ) : (
          <AuthorSmallCardSkeleton count={6} />
        )}
      </div>
    </div>
  );
};

export default Authors;
