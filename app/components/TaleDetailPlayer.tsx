"use client";

import { useMutation } from "convex/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "@/convex/_generated/api";
import { useAudio } from "@/providers/AudioProvider";
import { TaleDetailPlayerProps } from "@/Types";
import { useUser } from "@clerk/nextjs";

import LoaderSpinner from "./LoaderSpiner";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import EditTaleControls from "./EditTaleControls";
import { EditProvider } from "@/providers/EditProvider";
import ReactionButtons from "./ReactionButtons";

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
  const { setAudio } = useAudio();
  const { toast } = useToast();
  const { isSignedIn } = useUser();
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
      <div className="flex w-full flex-col gap-8 max-md:items-center md:flex-row">
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
            <p className="font-medium md:py-0 py-6">{taleDescription}</p>
            <p className="mt-3">
              AI voice: <strong className="text-white-1">{voiceType}</strong>
            </p>
          </article>
          <div className="flex flex-col w-full items-center md:flex-row md:justify-between gap-2">
            {isSignedIn ? (
              <>
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
                <ReactionButtons
                  taleId={taleId}
                  initialLikesCount={likesCount}
                  initialDislikesCount={dislikesCount}
                />
              </>
            ) : (
              <div className="text-center">
                <p className="mb-2">
                  To listen to this tale, please{" "}
                  <Link
                    href="/sign-in"
                    className=" text-purple-2 hover:text-violet-300 transition-all duration-500"
                  >
                    sign in
                  </Link>
                </p>
              </div>
            )}
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
