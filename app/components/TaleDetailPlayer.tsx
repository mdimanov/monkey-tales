"use client";
import { useMutation } from "convex/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "@/convex/_generated/api";
// import { useAudio } from "@/providers/AudioProvider";
import { TaleDetailPlayerProps } from "@/Types";

import LoaderSpinner from "./LoaderSpiner";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const TaleDetailPlayer = ({
  audioUrl,
  taleTitle,
  author,
  imageUrl,
  taleId,
  imageStorageId,
  audioStorageId,
  isOwner,
  authorImageUrl,
  authorId,
}: TaleDetailPlayerProps) => {
  const router = useRouter();
  //   const { setAudio } = useAudio();
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);
  const deletePodcast = useMutation(api.tales.deleteTale);

  const handleDelete = async () => {
    if (!imageStorageId || !audioStorageId) {
      toast({
        title: "Error deleting tale",
        variant: "destructive",
        description: "Missing storage IDs",
      });
      return;
    }
    try {
      await deletePodcast({ taleId, imageStorageId, audioStorageId });
      toast({
        title: "Tale deleted",
      });
      router.push("/");
    } catch (error) {
      console.error("Error deleting tale", error);
      toast({
        title: "Error deleting tale",
        variant: "destructive",
      });
    }
  };

  const handlePlay = () => {
    // setAudio({
    //   title: podcastTitle,
    //   audioUrl,
    //   imageUrl,
    //   author,
    //   podcastId,
    // });
  };

  if (!imageUrl || !authorImageUrl) return <LoaderSpinner />;

  return (
    <div className="mt-6 flex w-full justify-between max-md:justify-center">
      <div className="flex flex-col gap-8 max-md:items-center md:flex-row">
        <Image
          src={imageUrl}
          width={250}
          height={250}
          alt="Podcast image"
          className="aspect-square rounded-lg"
        />
        <div className="flex w-full flex-col gap-5 max-md:items-center md:gap-9">
          <article className="flex flex-col gap-2 max-md:items-center">
            <h1 className="text-32 font-extrabold tracking-[-0.32px] text-white-1">
              {taleTitle}
            </h1>
            <figure
              className="flex cursor-pointer items-center gap-2"
              onClick={() => {
                router.push(`/profile/${authorId}`);
              }}
            >
              <Image
                src={authorImageUrl}
                width={30}
                height={30}
                alt="Caster icon"
                className="size-[30px] rounded-full object-cover"
              />
              <h2 className="text-16 font-normal text-white-3">{author}</h2>
            </figure>
          </article>

          <Button
            onClick={handlePlay}
            className="text-16 w-full max-w-[250px] transition-all duration-500 bg-violet-600 hover:bg-violet-800 font-extrabold text-white-1"
          >
            <Image
              src="/icons/play.svg"
              width={20}
              height={20}
              alt="random play"
            />
            &nbsp; Play podcast
          </Button>
        </div>
      </div>
      {isOwner && (
        <div className="relative mt-2">
          <Image
            src="/icons/three-dots.svg"
            width={20}
            height={30}
            alt="Three dots icon"
            className="cursor-pointer"
            onClick={() => setIsDeleting((prev) => !prev)}
          />
          {isDeleting && (
            <div
              className="absolute -left-36 -top-1 z-10 flex w-32 cursor-pointer justify-center gap-2 rounded-md bg-black-2 py-1.5 hover:bg-purple-1"
              onClick={handleDelete}
            >
              <Image
                src="/icons/delete.svg"
                width={14}
                height={14}
                alt="Delete icon"
              />
              <h2 className="text-sm font-normal text-white-1">Delete</h2>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TaleDetailPlayer;
