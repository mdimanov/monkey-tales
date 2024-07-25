"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import EmptyState from "@/app/components/EmptyState";
import Searchbar from "@/app/components/Searchbar";
import TaleCard from "@/app/components/TaleCard";
import TaleCardSkeleton from "@/app/components/TaleCardSkeleton";
import { api } from "@/convex/_generated/api";
import { TalesData, PAGE_SIZE } from "@/Types/index";
import { useQuery } from "convex/react";
import PagePagination from "@/app/components/PagePagination";
import { SearchPaths } from "@/app/utils/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const Discover = ({
  searchParams: { search = "", page = "1", sort = "date" },
}: {
  searchParams: { search?: string; page?: string; sort?: string };
}) => {
  const router = useRouter();
  const [selectedValue, setSelectedValue] = useState(sort);

  // Parse the page parameter to a number
  const parsedPage = parseInt(page, 10);
  const talesData = useQuery(api.tales.getTaleBySearch, {
    search,
    page: parsedPage,
    sort: selectedValue,
  });

  const { results = [], totalCount = 0 } = (talesData as TalesData) || {};

  // Update the URL when the selectedValue changes
  useEffect(() => {
    const params = new URLSearchParams({
      search,
      page: page.toString(),
      sort: selectedValue,
    });
    router.push(`?${params.toString()}`);
  }, [selectedValue, search, page, router]);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="main_title">Discover</h1>
      <div className="flex flex-col items-end md:items-center md:flex-row w-full gap-2 md:gap-6">
        <Searchbar searchPath={SearchPaths.Discover} />
        <div className="flex w-96 items-center gap-2.5">
          <Label className="text-16 font-bold text-white-1 w-36 text-right">
            Filter by:
          </Label>
          <Select
            defaultValue="date"
            onValueChange={(value) => setSelectedValue(value)}
          >
            <SelectTrigger className="text-16 w-full border-none bg-black-2 text-gray-1">
              <SelectValue
                placeholder={
                  selectedValue === "date" ? "Most recent" : "Select value"
                }
              />
            </SelectTrigger>
            <SelectContent className="text-16 border-none bg-black-2 text-white-1 focus:ring-violet-600">
              <SelectItem className="focus:bg-purple-600" key="1" value="date">
                Most reacent
              </SelectItem>
              <SelectItem className="focus:bg-purple-600" key="2" value="views">
                Views
              </SelectItem>
              <SelectItem className="focus:bg-purple-600" key="3" value="AZ">
                A-Z
              </SelectItem>
              <SelectItem className="focus:bg-purple-600" key="4" value="ZA">
                Z-A
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
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
