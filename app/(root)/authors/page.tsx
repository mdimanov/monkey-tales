"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import AuthorSmallCardSkeleton from "@/app/components/AuthorSmallCardSkeleton";
import SmallProfileCard from "@/app/components/SmallProfileCard";

const Authors = () => {
  const topTaleTellers = useQuery(api.users.getTopUserByTaleCount);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="main_title">Authors</h1>
      <div className="grid grid-cols-2 gap-3">
        {topTaleTellers ? (
          topTaleTellers
            .slice(0, 6)
            .map((taleTeller) => (
              <SmallProfileCard
                key={taleTeller._id}
                imageUrl={taleTeller?.imageUrl!}
                userFirstName={taleTeller?.name!}
                tales={taleTeller.tale.length}
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
