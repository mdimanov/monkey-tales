// TaleCardSkeleton.tsx
import { FC } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type TaleCardSkeletonProps = {
  count: number;
};

const TaleCardSkeleton: FC<TaleCardSkeletonProps> = ({ count }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex flex-col space-y-3">
          <Skeleton className="h-[226px] w-[226px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[210px]" />
            <Skeleton className="h-4 w-[180px]" />
          </div>
        </div>
      ))}
    </>
  );
};

export default TaleCardSkeleton;
