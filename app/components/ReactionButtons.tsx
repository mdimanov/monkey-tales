"use client";

import Image from "next/image";
import { useMutation, useQuery } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { ReactionButtonsProps } from "@/Types";
import { useReaction } from "../hooks/useReaction";

const ReactionButtons: React.FC<ReactionButtonsProps> = ({
  taleId,
  initialLikesCount,
  initialDislikesCount,
}) => {
  const { toast } = useToast();
  const likeTaleMutation = useMutation(api.tales.likeTale);
  const dislikeTaleMutation = useMutation(api.tales.dislikeTale);

  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [dislikesCount, setDislikesCount] = useState(initialDislikesCount);

  const reaction = useReaction({ taleId });

  const handleReaction = async (type: "like" | "dislike") => {
    try {
      if (type === "like") {
        await likeTaleMutation({ taleId });

        if (reaction === "like") {
          setLikesCount(likesCount - 1);
        } else {
          setLikesCount(likesCount + 1);
          if (reaction === "dislike") {
            setDislikesCount(dislikesCount - 1);
          }
        }
      } else {
        await dislikeTaleMutation({ taleId });

        if (reaction === "dislike") {
          setDislikesCount(dislikesCount - 1);
        } else {
          setDislikesCount(dislikesCount + 1);
          if (reaction === "like") {
            setLikesCount(likesCount - 1);
          }
        }
      }
    } catch (error) {
      console.error(
        `Error ${type === "like" ? "liking" : "disliking"} the tale`,
        error
      );
      toast({
        title: `Error ${type === "like" ? "liking" : "disliking"} the tale`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex gap-2">
      <div
        className={cn(
          "flex text-white-1 select-none cursor-pointer h-10 px-4 py-2 bg-black-3 transition-all duration-500 hover:bg-black-2 items-center justify-center rounded-md w-[60px] gap-2",
          {
            "bg-green-600 hover:bg-green-800": reaction === "like",
          }
        )}
        onClick={() => handleReaction("like")}
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
          "flex text-white-1 select-none cursor-pointer h-10 px-4 py-2 bg-black-3 transition-all duration-500 hover:bg-black-2 items-center justify-center rounded-md w-[60px] gap-2",
          {
            "bg-red-600 hover:bg-red-800": reaction === "dislike",
          }
        )}
        onClick={() => handleReaction("dislike")}
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
