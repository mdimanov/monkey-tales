import { Id } from "@/convex/_generated/dataModel";
import React from "react";

const TaleDetails = ({
  params: { taleId },
}: {
  params: { taleId: Id<"tales"> };
}) => {
  return <>Test {taleId} </>;
};

export default TaleDetails;
