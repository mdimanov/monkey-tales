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
import EditTaleControls from "./EditTaleControls";

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
}: TaleDetailPlayerProps) => {
  const router = useRouter();
  const { setAudio } = useAudio();
  const { toast } = useToast();
  const [isPlaying, setIsPlaying] = useState(false);

  const updateViews = useMutation(api.tales.updateTaleViews);

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
            <p className="mt-3">
              AI voice: <strong className="text-white-1">{voiceType}</strong>
            </p>
          </article>

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
        </div>
      </div>
      {isOwner && (
        <div className="absolute md:right-0 md:top-0 md:relative top-2.5 right-2.5 min-w-5">
          <EditTaleControls
            taleId={taleId}
            taleTitle={taleTitle}
            taleDescription={taleDescription}
            imageStorageId={imageStorageId}
            audioStorageId={audioStorageId}
          />
        </div>
      )}
    </div>
  );
};

export default TaleDetailPlayer;
