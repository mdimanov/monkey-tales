"use client";

import EmptyState from "@/app/components/EmptyState";
import Searchbar from "@/app/components/Searchbar";
import TaleCard from "@/app/components/TaleCard";
import TaleCardSkeleton from "@/app/components/TaleCardSkeleton";
import { api } from "@/convex/_generated/api";
import { TalesData, PAGE_SIZE } from "@/Types/index";
import { useQuery } from "convex/react";
import PagePagination from "@/app/components/PagePagination";
import { SearchPaths } from "@/app/utils/constants";
import SortSelect from "@/app/components/SortSelect";

const Discover = ({
  searchParams: { search = "", page = "1", sort = "date" },
}: {
  searchParams: { search?: string; page?: string; sort?: string };
}) => {
  // Parse the page parameter to a number
  const parsedPage = parseInt(page, 10);
  const talesData = useQuery(api.tales.getTaleBySearch, {
    search,
    page: parsedPage,
    sort: sort,
  });

  const { results = [], totalCount = 0 } = (talesData as TalesData) || {};

  return (
    <div className="flex flex-col gap-6">
      <h1 className="main_title">Discover</h1>
      <div className="flex flex-col items-end md:items-center md:flex-row w-full gap-2 md:gap-6">
        <Searchbar searchPath={SearchPaths.Discover} />
        <SortSelect searchParams={{ search, page, sort }} />
      </div>
      {talesData ? (
        <>
          {totalCount > 0 ? (
            <>
              <div className="tale_grid">
                {results.map(
                  ({ _id, taleTitle, taleDescription, imageUrl, views }) => (
                    <TaleCard
                      key={_id}
                      taleId={_id}
                      title={taleTitle}
                      views={views}
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
