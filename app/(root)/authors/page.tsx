"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import AuthorSmallCardSkeleton from "@/app/components/AuthorSmallCardSkeleton";
import SmallProfileCard from "@/app/components/SmallProfileCard";
import { AuthorsData } from "@/Types";
import Searchbar from "@/app/components/Searchbar";
import { SearchPaths, SearchResults } from "@/app/utils/constants";
import SearchResultsCount from "@/app/components/SearchResultsCount";
import EmptyState from "@/app/components/EmptyState";

const Authors = ({
  searchParams: { search = "" },
}: {
  searchParams: { search?: string };
}) => {
  const authorsData = useQuery(api.users.getAuthorsBySearch, {
    search,
  });

  const { results = [], totalCount = 0 } = (authorsData as AuthorsData) || {};

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <h1 className="main_title">Authors</h1>
      <Searchbar searchPath={SearchPaths.Authors} />
      {authorsData ? (
        <>
          {totalCount > 0 ? (
            <>
              <SearchResultsCount
                search={search}
                totalCount={totalCount}
                searchResultsLabel={SearchResults.Authors}
              />
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((author) => (
                  <SmallProfileCard
                    key={author._id}
                    imageUrl={author?.imageUrl!}
                    userFirstName={author?.name!}
                    tales={author.totalTales}
                    clerkId={author.clerkId}
                  />
                ))}
              </div>
            </>
          ) : (
            <EmptyState title="No results found" />
          )}
        </>
      ) : (
        <>
          <SearchResultsCount />
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AuthorSmallCardSkeleton count={6} />
          </div>
        </>
      )}
    </div>
  );
};

export default Authors;
