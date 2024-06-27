"use client";
import { useMutation } from "convex/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "@/convex/_generated/api";
import { useAudio } from "@/providers/AudioProvider";
import { TaleDetailPlayerProps } from "@/Types";

import LoaderSpinner from "./LoaderSpiner";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const TaleDetailPlayer = ({
  audioUrl,
  taleTitle,
  taleDescription,
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
  const { setAudio } = useAudio();
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteTale = useMutation(api.tales.deleteTale);
  const updateViews = useMutation(api.tales.updateTaleViews);

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
      await deleteTale({ taleId, imageStorageId, audioStorageId });
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

  const handlePlay = async () => {
    try {
      await updateViews({ taleId });
      setAudio({
        title: taleTitle,
        audioUrl,
        imageUrl,
        author,
        taleId,
      });
    } catch (error) {
      console.error("Error updating tale views", error);
      toast({
        title: "Error playing tale",
        variant: "destructive",
      });
    }
  };

  if (!imageUrl || !authorImageUrl) return <LoaderSpinner />;

  return (
    <div className="relative mt-6 flex w-full justify-between max-md:justify-center">
      <div className="flex flex-col gap-8 max-md:items-center md:flex-row">
        <div className="w-full">
          <Image
            src={imageUrl}
            width={300}
            height={300}
            alt="Tale image"
            className="w-full h-auto max-w-full max-h-full rounded-lg"
          />
        </div>
        <div className="flex w-full flex-col gap-5 max-md:items-center md:gap-6">
          <article className="flex flex-col gap-2 max-md:items-center">
            <h1 className="text-32 font-extrabold tracking-[-0.32px] text-white-1">
              {taleTitle}
            </h1>
            <figure
              className="flex w-full cursor-pointer items-center gap-2"
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
            <p className="font-medium md:py-0 py-6 max-md:text-center">
              {taleDescription}
            </p>
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
            &nbsp; Play tale
          </Button>
        </div>
      </div>
      {isOwner && (
        <div className="absolute right-0 md:relative mt-2 mx-2 min-w-5">
          <Image
            src="/icons/three-dots.svg"
            width={24}
            height={24}
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
