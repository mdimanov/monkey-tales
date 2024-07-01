"use client";

import { useQuery } from "convex/react";
import TaleCard from "../components/TaleCard";

import { api } from "@/convex/_generated/api";
import TaleCardSkeleton from "../components/TaleCardSkeleton";

const Home = () => {
  const trendingTales = useQuery(api.tales.getTopFourTalesByViews);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="main_title">Trending Tales</h1>

      <div className="tale_grid">
        {trendingTales ? (
          trendingTales.map(({ _id, taleTitle, taleDescription, imageUrl }) => (
            <TaleCard
              key={_id}
              taleId={_id}
              title={taleTitle}
              description={taleDescription}
              imgUrl={imageUrl}
            />
          ))
        ) : (
          <TaleCardSkeleton count={4} />
        )}
      </div>
    </div>
  );
};

export default Home;
