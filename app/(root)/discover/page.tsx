"use client";

import EmptyState from "@/app/components/EmptyState";
import Searchbar from "@/app/components/Searchbar";
import TaleCard from "@/app/components/TaleCard";
import TaleCardSkeleton from "@/app/components/TaleCardSkeleton";
import { api } from "@/convex/_generated/api";
import { TalesData, PAGE_SIZE } from "@/Types/index";
import { useQuery } from "convex/react";
import PagePagination from "@/app/components/PagePagination";

const Discover = ({
  searchParams: { search = "", page = "1" },
}: {
  searchParams: { search?: string; page?: string };
}) => {
  // Parse the page parameter to a number
  const parsedPage = parseInt(page, 10);
  const talesData = useQuery(api.tales.getTaleBySearch, {
    search,
    page: parsedPage,
  });

  const { results = [], totalCount = 0 } = (talesData as TalesData) || {};

  return (
    <div className="flex flex-col gap-6">
      <h1 className="main_title">Discover</h1>
      <Searchbar />
      {talesData ? (
        <>
          {totalCount > 0 ? (
            <>
              <div className="tale_grid">
                {results.map(
                  ({ _id, taleTitle, taleDescription, imageUrl }) => (
                    <TaleCard
                      key={_id}
                      taleId={_id}
                      title={taleTitle}
                      description={taleDescription}
                      imgUrl={imageUrl ?? ""}
                    />
                  )
                )}
              </div>
              <PagePagination
                search={search}
                parsedPage={parsedPage}
                totalCount={totalCount}
                pageSize={PAGE_SIZE}
              />
            </>
          ) : (
            <EmptyState title="No results found" />
          )}
        </>
      ) : (
        <div className="tale_grid">
          <TaleCardSkeleton count={8} />
        </div>
      )}
    </div>
  );
};

export default Discover;
