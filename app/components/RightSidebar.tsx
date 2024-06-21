"use client";

import { SignedIn, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Header from "./Header";
import EmblaCarousel from "./EmblaCarousel";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import LoaderSpiner from "./LoaderSpiner";

const RightSidebar = () => {
  const { user } = useUser();
  const topTaleTellers = useQuery(api.users.getTopUserByTaleCount);
  return (
    <section className="right_sidebar">
      <SignedIn>
        <Link href={`/profile/${user?.id}`} className="flex gap-3 pb-12">
          <UserButton />
          <div className="flex w-full items-center justify-between">
            <h2 className="truncate font-semibold">
              {user?.firstName} {user?.lastName}
            </h2>
            <Image
              src="/icons/arrow-right.svg"
              width={20}
              height={20}
              alt="arrow"
            />
          </div>
        </Link>
      </SignedIn>
      <section>
        <Header headerTitle="Other authors" />
        {topTaleTellers ? (
          <EmblaCarousel fansLikeDetail={topTaleTellers} />
        ) : (
          <LoaderSpiner />
        )}
      </section>
    </section>
  );
};

export default RightSidebar;
