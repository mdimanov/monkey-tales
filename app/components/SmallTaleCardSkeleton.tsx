import { FC } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type SmallTaleCardSkeletonProps = {
  count: number;
};

const SmallTaleCardSkeleton: FC<SmallTaleCardSkeletonProps> = ({ count }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="flex w-full items-center justify-between space-x-3"
        >
          <div className="flex items-center gap-2">
            <Skeleton className="h-[50px] w-[50px] rounded-xl" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-3 w-[165px]" />
              <Skeleton className="h-3 w-[95px]" />
            </div>
          </div>
          <div className="flex gap-8">
            <Skeleton className="h-2 w-[65px]" />
            <Skeleton className="h-2 w-[65px]" />
          </div>
        </div>
      ))}
    </>
  );
};

export default SmallTaleCardSkeleton;
