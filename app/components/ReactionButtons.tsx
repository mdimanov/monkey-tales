"use client";

import Image from "next/image";
import { useMutation, useQuery } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { api } from "@/convex/_generated/api";
import { useEffect, useState } from "react";
import { ReactionButtonsProps, ReactionType } from "@/Types";

const ReactionButtons: React.FC<ReactionButtonsProps> = ({
  taleId,
  initialLikesCount,
  initialDislikesCount,
}) => {
  const { toast } = useToast();
  const { user, isLoaded } = useUser();
  const likeTaleMutation = useMutation(api.tales.likeTale);
  const dislikeTaleMutation = useMutation(api.tales.dislikeTale);

  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [dislikesCount, setDislikesCount] = useState(initialDislikesCount);

  const [reaction, setReaction] = useState<ReactionType>(null);

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

  const handleLike = async () => {
    try {
      await likeTaleMutation({ taleId });
      setReaction(reaction === "like" ? null : "like");

      if (reaction === "like") {
        setLikesCount(likesCount - 1);
      } else {
        setLikesCount(likesCount + 1);
        if (reaction === "dislike") {
          setDislikesCount(dislikesCount - 1);
        }
      }
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

      if (reaction === "dislike") {
        setDislikesCount(dislikesCount - 1);
      } else {
        setDislikesCount(dislikesCount + 1);
        if (reaction === "like") {
          setLikesCount(likesCount - 1);
        }
      }
    } catch (error) {
      console.error("Error disliking the tale", error);
      toast({
        title: "Error disliking the tale",
        variant: "destructive",
      });
    }
  };

  return (
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
          alt="I don't like this tale"
        />
      </div>
    </div>
  );
};

export default ReactionButtons;
