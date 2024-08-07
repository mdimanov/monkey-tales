"use client";
import { useQuery, useMutation } from "convex/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useAudio } from "@/providers/AudioProvider";
import { TaleDetailPlayerProps } from "@/Types";

import LoaderSpinner from "./LoaderSpiner";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import EditTaleControls from "./EditTaleControls";
import { EditProvider } from "@/providers/EditProvider";
import { cn } from "@/lib/utils";

const TaleDetailPlayer = ({
  audioUrl,
  voiceType,
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
  likesCount,
  dislikesCount,
}: TaleDetailPlayerProps) => {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const { setAudio } = useAudio();
  const { toast } = useToast();
  const [isPlaying, setIsPlaying] = useState(false);

  const [reaction, setReaction] = useState<null | "like" | "dislike">(null);
  const likeTaleMutation = useMutation(api.tales.likeTale);
  const dislikeTaleMutation = useMutation(api.tales.dislikeTale);

  const updateViews = useMutation(api.tales.updateTaleViews);

  const userId = isLoaded && user ? user.id : "";

  const userReaction = useQuery(api.tales.getUserReaction, {
    taleId,
    clerkId: userId,
  });

  useEffect(() => {
    if (userReaction) {
      setReaction(userReaction);
    }
  }, [userReaction]);

  const handlePlay = async () => {
    setIsPlaying(true);
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

  const handleLike = async () => {
    try {
      await likeTaleMutation({ taleId });
      setReaction(reaction === "like" ? null : "like");
    } catch (error) {
      console.error("Error liking the tale", error);
      toast({
        title: "Error liking the tale",
        variant: "destructive",
      });
    }
  };

  const handleDislike = async () => {
    try {
      await dislikeTaleMutation({ taleId });
      setReaction(reaction === "dislike" ? null : "dislike");
    } catch (error) {
      console.error("Error liking the tale", error);
      toast({
        title: "Error disliking the tale",
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
                width={60}
                height={60}
                alt="Caster icon"
                className="size-[30px] rounded-full object-cover"
                style={{ width: "30px", height: "30px" }}
              />
              <h2 className="text-16 font-normal text-white-3">{author}</h2>
            </figure>
            <p className="font-medium md:py-0 py-6 max-md:text-center">
              {taleDescription}
            </p>
            <p className="mt-3">
              AI voice: <strong className="text-white-1">{voiceType}</strong>
            </p>
          </article>
          <div className="flex flex-col w-full items-center md:flex-row md:justify-between gap-2">
            <Button
              onClick={handlePlay}
              disabled={isPlaying}
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
            <div className="flex gap-2">
              <div
                className={cn(
                  "flex text-white-1 cursor-pointer h-10 px-4 py-2 bg-black-3 transition-all duration-500 hover:bg-black-2 items-center justify-center rounded-md w-[60px] gap-2",
                  {
                    "bg-green-600 hover:bg-green-800": reaction === "like",
                  }
                )}
                onClick={handleLike}
              >
                <Image
                  src={
                    reaction === "like"
                      ? "/icons/thumb-up-solid.svg"
                      : "/icons/thumb-up.svg"
                  }
                  width={20}
                  height={20}
                  alt="I like this tale"
                />
                {likesCount}
              </div>
              <div
                className={cn(
                  "flex text-white-1 cursor-pointer h-10 px-4 py-2 bg-black-3 transition-all duration-500 hover:bg-black-2 items-center justify-center rounded-md w-[60px] gap-2",
                  {
                    "bg-red-600 hover:bg-red-800": reaction === "dislike",
                  }
                )}
                onClick={handleDislike}
              >
                {dislikesCount}
                <Image
                  src={
                    reaction === "dislike"
                      ? "/icons/thumb-down-solid.svg"
                      : "/icons/thumb-down.svg"
                  }
                  width={20}
                  height={20}
                  alt="I don't this tale"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {isOwner && (
        <div className="absolute min-w-[40px] md:right-0 md:top-0 md:relative top-2.5 right-2.5">
          <EditProvider>
            <EditTaleControls
              taleId={taleId}
              taleTitle={taleTitle}
              taleDescription={taleDescription}
              imageStorageId={imageStorageId}
              audioStorageId={audioStorageId}
            />
          </EditProvider>
        </div>
      )}
    </div>
  );
};

export default TaleDetailPlayer;
