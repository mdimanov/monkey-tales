import React from "react";

const TaleDetails = ({ params }: { params: { taleSlug: string } }) => {
  return (
    <h1 className="text-20 font-bold text-slate-200">
      TaleDetails slug {params.taleSlug}
    </h1>
  );
};

export default TaleDetails;
