"use client";

import { Id } from "@/convex/_generated/dataModel";
import { FacebookShareButton, FacebookIcon } from "next-share";
import React from "react";

const TaleDetails = ({
  params: { taleId },
}: {
  params: { taleId: Id<"tales"> };
}) => {
  return (
    <>
      Test {taleId}{" "}
      <FacebookShareButton
        url={`https://monkey-tales.vercel.app/tales/${taleId}`}
        hashtag={"#nextshare"}
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>
    </>
  );
};

export default TaleDetails;
