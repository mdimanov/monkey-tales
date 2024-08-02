"use client";

import Image from "next/image";
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

const Admin = () => {
  const { user } = useUser();
  const router = useRouter();
  const allTales = useQuery(api.tales.getAllTales, {});

  useEffect(() => {
    if (user?.id !== ADMIN) {
      router.push("/");
    }
  }, [user, router]);

  if (user?.id !== ADMIN) {
    return <LoaderSpiner />;
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="main_title">Admin Panel</h1>
      <div className="flex flex-col gap-2">
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
              <div key={_id} className="flex gap-6">
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
      </div>
    </div>
  );
};

export default Admin;
