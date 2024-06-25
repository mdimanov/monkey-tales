"use client";

import { useQuery } from "convex/react";
import TaleCard from "../components/TaleCard";

import { api } from "@/convex/_generated/api";

const Home = () => {
  const trendingTales = useQuery(api.tales.getTrendingTales);
  return (
    <div className="flex flex-col gap-9">
      <h1 className="main_title">Trending Tales</h1>

      <div className="tale_grid">
        {trendingTales?.map(({ _id, taleTitle, taleDescription, imageUrl }) => (
          <TaleCard
            key={_id}
            taleId={_id}
            title={taleTitle}
            description={taleDescription}
            imgUrl={imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
