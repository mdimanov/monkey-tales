"use client";

import { SignedIn, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Header from "./Header";
import EmblaCarousel from "./EmblaCarousel";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import LoaderSpiner from "./LoaderSpiner";
import AuthorCardSkeleton from "./AuthorCardSkeleton";

const RightSidebar = () => {
  const { user } = useUser();
  const router = useRouter();
  const topTaleTellers = useQuery(api.users.getTopUserByTaleCount);
  return (
    <section className="right_sidebar">
      <SignedIn>
        <Link
          href={`/profile/${user?.id}`}
          className="relative flex gap-3 pb-12"
        >
          <UserButton />
          <div className="flex w-full items-center justify-between">
            <h2 className="truncate font-semibold">
              {user?.firstName} {user?.lastName}
            </h2>
            <div
              className="absolute h-[28px] flex items-center justify-end right-0 top-0 transform transition-transform duration-500 hover:translate-x-2"
              style={{ width: "calc(100% - 28px)" }}
            >
              <Image
                src="/icons/arrow-right.svg"
                width={20}
                height={20}
                className="w-5 h-5 r-0"
                alt="arrow"
              />
            </div>
          </div>
        </Link>
      </SignedIn>
      <section>
        <Header headerTitle="Authors most listen tales" />
        {topTaleTellers ? (
          <EmblaCarousel fansLikeDetail={topTaleTellers} />
        ) : (
          <LoaderSpiner />
        )}
      </section>
      <section className="flex flex-col gap-8 pt-12 pb-4">
        <Header headerTitle="Top Authors" />
        <div className="flex flex-col gap-3">
          {topTaleTellers ? (
            topTaleTellers.slice(0, 6).map((taleTeller) => (
              <div
                key={taleTeller._id}
                className="flex cursor-pointer justify-between transition-all duration-500 rounded-lg items-center font-semibold border-transparent hover:border-violet-800 hover:bg-lates-focus border-l-4"
                onClick={() => router.push(`/profile/${taleTeller.clerkId}`)}
              >
                <figure className="flex items-center gap-2">
                  <Image
                    src={taleTeller.imageUrl}
                    alt={`${taleTeller.name} profile picture`}
                    width={36}
                    height={36}
                    className="aspect-square rounded-lg"
                  />
                  <h3 className="text-sm font-semibold">{taleTeller.name}</h3>
                </figure>
                <div className="flex items-center">
                  <p className="text-12 font-normal text-white-1">
                    {`${taleTeller.totalTales} tale${taleTeller.totalTales !== 1 ? "s" : ""}`}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <AuthorCardSkeleton count={2} />
          )}
        </div>
      </section>
    </section>
  );
};

export default RightSidebar;
