"use client";

import { useQuery } from "convex/react";
import TaleCard from "../components/TaleCard";
import { TALES } from "../utils/constants";

import { api } from "@/convex/_generated/api";

const Home = () => {
  const tasks = useQuery(api.tasks.get);
  return (
    <div>
      <h1 className="main_title">Trending Tales</h1>

      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        {tasks?.map(({ _id, text }) => <div key={_id}>{text}</div>)}
      </div>

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
