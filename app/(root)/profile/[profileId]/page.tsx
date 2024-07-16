"use client";

import { useQuery } from "convex/react";

import EmptyState from "@/app/components/EmptyState";
import LoaderSpiner from "@/app/components/LoaderSpiner";
import TaleCard from "@/app/components/TaleCard";
import ProfileCard from "@/app/components/ProfileCard";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";

const ProfilePage = ({
  params,
}: {
  params: {
    profileId: string;
  };
}) => {
  const { user: loggedUser } = useUser();
  const user = useQuery(api.users.getUserById, {
    clerkId: params.profileId,
  });
  const taleData = useQuery(api.tales.getTaleByAuthorId, {
    authorId: params.profileId,
  });

  const isMyProfile = loggedUser?.id === params.profileId;

  if (!user || !taleData) return <LoaderSpiner />;

  return (
    <section className="flex w-full flex-col">
      <h1 className="text-24 font-bold text-slate-50">
        {isMyProfile ? "My" : "Author"} Profile
      </h1>
      <div className="flex flex-col gap-6 max-md:items-center md:flex-row">
        <ProfileCard
          imageUrl={user?.imageUrl!}
          userFirstName={user?.name!}
          listeners={taleData.listeners}
        />
      </div>
      <section className="mt-9 flex flex-col gap-5">
        <h1 className="text-20 font-bold text-white-1">All Tales</h1>
        {taleData && taleData.tales.length > 0 ? (
          <div className="tale_grid">
            {taleData?.tales?.map((tale) => (
              <TaleCard
                key={tale._id}
                imgUrl={tale.imageUrl!}
                title={tale.taleTitle!}
                views={tale.views}
                description={tale.taleDescription}
                taleId={tale._id}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="You have not created any tales yet"
            buttonLink="/create-tale"
            buttonText="Create Tale"
          />
        )}
      </section>
    </section>
  );
};

export default ProfilePage;
