import { useState, useEffect } from "react";
import { useQuery } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { api } from "@/convex/_generated/api";
import { ReactionType, UseReactionProps } from "@/Types";

export const useReaction = ({ taleId }: UseReactionProps): ReactionType => {
  const { user, isLoaded } = useUser();
  const [reaction, setReaction] = useState<ReactionType>(null);

  const userId = isLoaded && user ? user.id : "";

  const userReaction = useQuery(api.tales.getUserReaction, {
    taleId,
    clerkId: userId,
  });

  useEffect(() => {
    if (userReaction !== undefined) {
      setReaction(userReaction);
    }
  }, [userReaction]);

  return reaction;
};
