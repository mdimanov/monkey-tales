"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import AuthorSmallCardSkeleton from "@/app/components/AuthorSmallCardSkeleton";
import SmallProfileCard from "@/app/components/SmallProfileCard";
import { AuthorsData } from "@/Types";
import Searchbar from "@/app/components/Searchbar";
import { SearchPaths } from "@/app/utils/constants";

const Authors = ({
  searchParams: { search = "" },
}: {
  searchParams: { search?: string };
}) => {
  const authorsData = useQuery(api.users.getAuthorsBySearch, {
    search,
  });

  const { results = [] } = (authorsData as AuthorsData) || {};

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <h1 className="main_title">Authors</h1>
      <Searchbar searchPath={SearchPaths.Authors} />
      <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-6">
        {authorsData ? (
          results
            .slice(0, 6)
            .map((author) => (
              <SmallProfileCard
                key={author._id}
                imageUrl={author?.imageUrl!}
                userFirstName={author?.name!}
                tales={author.totalTales}
                clerkId={author.clerkId}
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
