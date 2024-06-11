import React from "react";
import TaleCard from "../components/TaleCard";
import { TALES } from "../utils/constants";

const Home = () => {
  return (
    <div>
      <h1 className="text-20 font-bold text-slate-200 mb-5">Trending Tales</h1>
      <div className="tale_grid">
        {TALES.map((tale) => (
          <TaleCard
            key={tale.id}
            id={tale.id}
            title={tale.title}
            description={tale.description}
            imgURL={tale.imgURL}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
