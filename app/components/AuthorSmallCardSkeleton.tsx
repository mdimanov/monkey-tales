import { FC } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type AuthorCardSkeletonProps = {
  count: number;
};

const AuthorSmallCardSkeleton: FC<AuthorCardSkeletonProps> = ({ count }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="flex w-full items-center justify-between space-x-3"
        >
          <div className="flex items-start gap-6">
            <Skeleton className="h-[130px] w-[130px] rounded-xl" />
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 rounded-full w-5" />
                <Skeleton className="h-2 w-[45px]" />
                <Skeleton className="h-2 w-[65px]" />
              </div>
              <Skeleton className="h-5 w-[165px]" />
              <Skeleton className="h-3 w-[95px]" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default AuthorSmallCardSkeleton;
