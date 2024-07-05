"use client";

import { useQuery } from "convex/react";
import TaleCard from "../components/TaleCard";
import SmallTaleCard from "../components/SmallTaleCard";

import { api } from "@/convex/_generated/api";
import TaleCardSkeleton from "../components/TaleCardSkeleton";
import SmallTaleCardSkeleton from "../components/SmallTaleCardSkeleton";
import Link from "next/link";

const Home = () => {
  const trendingTales = useQuery(api.tales.getTopTalesByViews, { numTales: 4 });
  const latesTales = useQuery(api.tales.getAllTales, { numTales: 6 });

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
      <section className="mt-4">
        <div className="flex items-center justify-between pb-5">
          <h2 className="text-20 font-bold text-white-1">Latest Tales</h2>
          <Link
            href="/discover"
            className="text-sm text-purple-2 hover:text-violet-300 transition-all duration-500"
          >
            See all
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          {latesTales ? (
            latesTales.map(
              ({
                _id,
                taleTitle,
                imageUrl,
                author,
                voiceType,
                audioDuration,
                views,
              }) => (
                <SmallTaleCard
                  key={_id}
                  taleId={_id}
                  title={taleTitle}
                  author={author}
                  imgUrl={imageUrl}
                  audioDuration={audioDuration}
                  views={views}
                />
              )
            )
          ) : (
            <SmallTaleCardSkeleton count={6} />
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
