"use client";

import EmptyState from "@/app/components/EmptyState";
import LoaderSpiner from "@/app/components/LoaderSpiner";
import Searchbar from "@/app/components/Searchbar";
import TaleCard from "@/app/components/TaleCard";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import React from "react";

const Discover = ({
  searchParams: { search = "" },
}: {
  searchParams: { search?: string };
}) => {
  const talesData = useQuery(api.tales.getTaleBySearch, { search });

  return (
    <div className="flex flex-col gap-9">
      <div className="flex flex-col gap-9">
        <h1 className="main_title">Discover</h1>
        <Searchbar />
        {talesData ? (
          <>
            {talesData.length > 0 ? (
              <div className="tale_grid">
                {talesData?.map(
                  ({ _id, taleTitle, taleDescription, imageUrl }) => (
                    <TaleCard
                      key={_id}
                      taleId={_id}
                      title={taleTitle}
                      description={taleDescription}
                      imgUrl={imageUrl}
                    />
                  )
                )}
              </div>
            ) : (
              <EmptyState title="No results found" />
            )}
          </>
        ) : (
          <LoaderSpiner />
        )}
      </div>
    </div>
  );
};

export default Discover;
