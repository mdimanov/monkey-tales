"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { TopTaleTellerCardProps } from "@/Types";

const TopTaleTellerCard = ({ taleTeller }: TopTaleTellerCardProps) => {
  const router = useRouter();
  return (
    <div
      className="flex cursor-pointer justify-between transition-all duration-500 rounded-lg items-center font-semibold border-transparent hover:border-violet-800 hover:bg-lates-focus border-l-4"
      onClick={() => router.push(`/profile/${taleTeller.clerkId}`)}
    >
      <figure className="flex items-center gap-2">
        <Image
          src={taleTeller.imageUrl}
          alt={`${taleTeller.name} profile picture`}
          width={70}
          height={70}
          className="aspect-square object-cover rounded-lg"
          style={{ width: "36px", height: "36px" }}
        />
        <h3 className="text-sm font-semibold">{taleTeller.name}</h3>
      </figure>
      <div className="flex items-center">
        <p className="text-12 font-normal text-white-1">
          {`${taleTeller.totalTales} tale${taleTeller.totalTales !== 1 ? "s" : ""}`}
        </p>
      </div>
    </div>
  );
};

export default TopTaleTellerCard;
