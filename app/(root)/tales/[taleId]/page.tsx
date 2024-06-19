"use client";

import TaleDetailPlayer from "@/app/components/TaleDetailPlayer";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import Image from "next/image";
import React from "react";

const TaleDetails = ({
  params: { taleId },
}: {
  params: { taleId: Id<"tales"> };
}) => {
  const tale = useQuery(api.tales.getTalesById, { taleId });

  return (
    <section className="flex w-full flex-col">
      <header className="flex items-center justify-between">
        <h1 className="text-24 font-bold text-slate-50">Currently playing</h1>
        <figure className="flex gap-3">
          <Image
            src="/icons/headphones.svg"
            width={24}
            height={24}
            alt="headphone"
          />
          <h2>{tale?.views}</h2>
        </figure>
      </header>
      <TaleDetailPlayer />
      <p className="pb-8 pt-[45px] font-medium max-md:text-center">
        {tale?.taleDescription}
      </p>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h3 className="text-18 text-white-1 font-medium">Transcription</h3>
          <p>{tale?.voicePrompt}</p>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-18 text-white-1 font-medium">Thumbnail prompt</h3>
          <p>{tale?.imagePrompt}</p>
        </div>
      </div>
      <section className="mt-8 flex flex-col gap-5">
        <h3 className="text-18 text-white-1 font-medium">Similar podcasts</h3>
      </section>
    </section>
  );
};

export default TaleDetails;
