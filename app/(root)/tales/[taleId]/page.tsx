"use client";

import EmptyState from "@/app/components/EmptyState";
import LoaderSpiner from "@/app/components/LoaderSpiner";
import TaleCard from "@/app/components/TaleCard";
import TaleDetailPlayer from "@/app/components/TaleDetailPlayer";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import Image from "next/image";
import React from "react";
import Head from "next/head";

const TaleDetails = ({
  params: { taleId },
}: {
  params: { taleId: Id<"tales"> };
}) => {
  const { user } = useUser();
  const tale = useQuery(api.tales.getTalesById, { taleId });
  const similarTales = useQuery(api.tales.getTaleByVoiceType, { taleId });

  const isOwner = user?.id === tale?.authorId;

  if (!similarTales || !tale) return <LoaderSpiner />;

  return (
    <section className="flex w-full flex-col">
      <Head>
        <title>{tale?.taleTitle || "Tale Details"}</title>
        <meta
          name="description"
          content={
            tale?.taleDescription ||
            "Listen to the latest tales and explore similar stories."
          }
        />
        <meta property="og:title" content={tale?.taleTitle || "Tale Details"} />
        <meta
          property="og:description"
          content={
            tale?.taleDescription ||
            "Listen to the latest tales and explore similar stories."
          }
        />
        <meta
          property="og:image"
          content={tale?.imageUrl || "/default-image.jpg"}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://monkey-tales.vercel.app/tales/${taleId}`}
        />
      </Head>
      <header className="flex items-center justify-between">
        <h1 className="text-24 font-bold text-slate-50">Currently playing</h1>
        <figure className="flex gap-3">
          <Image
            src="/icons/headphones.svg"
            width={20}
            height={20}
            alt="headphone"
          />
          <h2>{tale?.views}</h2>
        </figure>
      </header>
      <TaleDetailPlayer isOwner={isOwner} taleId={tale._id} {...tale} />
      <div className="flex flex-col mt-6 gap-8">
        <div className="flex flex-col gap-4">
          <h3 className="text-18 text-white-1 font-medium">Transcription</h3>
          <p>{tale?.voicePrompt}</p>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-18 text-white-1 font-medium">Thumbnail prompt</h3>
          <p>{tale?.imagePrompt ? tale.imagePrompt : "Custom image upload"}</p>
        </div>
      </div>
      <section className="my-8  flex flex-col gap-5">
        <h3 className="text-24 font-bold text-white-1">Similar tales</h3>
        {similarTales && similarTales.length > 0 ? (
          <div className="tale_grid">
            {similarTales?.map(
              ({ _id, taleTitle, taleDescription, views, imageUrl }) => (
                <TaleCard
                  key={_id}
                  taleId={_id}
                  title={taleTitle}
                  views={views}
                  description={taleDescription}
                  imgUrl={imageUrl}
                />
              )
            )}
          </div>
        ) : (
          <EmptyState
            title="No similar tales found"
            buttonLink="/discover"
            buttonText="Discover more tales"
          />
        )}
      </section>
    </section>
  );
};

export default TaleDetails;
