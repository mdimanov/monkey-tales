import React from "react";

const TaleDetails = ({ params }: { params: { taleSlug: string } }) => {
  return <h1 className="main_title">TaleDetails slug {params.taleSlug}</h1>;
};

export default TaleDetails;
