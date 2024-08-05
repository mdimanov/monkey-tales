"use client";

import { useEffect } from "react";
import LoaderSpiner from "@/app/components/LoaderSpiner";
import { ADMIN } from "@/app/utils/constants";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import SmallTaleCard from "@/app/components/SmallTaleCard";
import SmallTaleCardSkeleton from "@/app/components/SmallTaleCardSkeleton";
import EditTaleControls from "@/app/components/EditTaleControls";
import { EditProvider } from "@/providers/EditProvider";

const Admin = () => {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const allTales = useQuery(api.tales.getAllTales, {});

  useEffect(() => {
    if (isLoaded && user?.id !== ADMIN) {
      router.push("/");
    }
  }, [user, isLoaded, router]);

  if (!isLoaded || user?.id !== ADMIN) {
    return <LoaderSpiner />;
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="main_title">Admin Panel</h1>
      <div className="flex flex-col gap-2">
        <EditProvider>
          {allTales ? (
            allTales.map(
              ({
                _id,
                taleTitle,
                imageUrl,
                author,
                audioDuration,
                views,
                taleDescription,
                imageStorageId,
                audioStorageId,
              }) => (
                <div
                  key={_id}
                  className="flex gap-6 rounded-xl transition-all hover:bg-lates-focus"
                >
                  <SmallTaleCard
                    taleId={_id}
                    title={taleTitle}
                    author={author}
                    imgUrl={imageUrl}
                    audioDuration={audioDuration}
                    views={views}
                  />
                  <EditTaleControls
                    taleId={_id}
                    taleTitle={taleTitle}
                    taleDescription={taleDescription}
                    imageStorageId={imageStorageId}
                    audioStorageId={audioStorageId}
                  />
                </div>
              )
            )
          ) : (
            <SmallTaleCardSkeleton count={15} />
          )}
        </EditProvider>
      </div>
    </div>
  );
};

export default Admin;
