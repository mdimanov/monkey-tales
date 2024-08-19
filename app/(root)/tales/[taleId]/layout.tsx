import { Id } from "@/convex/_generated/dataModel";
import type { Metadata } from "next";

import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { TaleProps } from "@/Types";

import React from "react";
import { PROD_URL } from "@/app/utils/constants";

type TaleLayoutProps = {
  children: React.ReactNode;
  params: {
    taleId: Id<"tales">;
  };
};

export async function generateMetadata({
  params,
}: TaleLayoutProps): Promise<Metadata> {
  const { taleId } = params;

  // Preload query using the provided authorId and taleId
  const preloadedTales = await preloadQuery(api.tales.getTalesById, {
    taleId,
  });

  // Safely cast the _valueJSON from unknown to TalesData
  const taleData = preloadedTales._valueJSON as unknown as TaleProps;

  return {
    title: taleData.taleTitle,
    description: taleData.taleDescription,
    metadataBase: new URL(`${PROD_URL}/tales/${taleId}`),
    openGraph: {
      images: [taleData.imageUrl ?? "/images/no-photo-available.jpg"],
    },
  };
}

export default function TaleLayout({ children }: TaleLayoutProps) {
  return <>{children}</>;
}
