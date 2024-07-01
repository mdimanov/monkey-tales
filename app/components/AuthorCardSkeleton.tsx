import { FC } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type AuthorCardSkeletonProps = {
  count: number;
};

const AuthorCardSkeleton: FC<AuthorCardSkeletonProps> = ({ count }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="flex w-full items-center justify-between space-x-3"
        >
          <div className="flex items-center gap-2">
            <Skeleton className="h-[36px] w-[36px] rounded-xl" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-3 w-[55px]" />
              <Skeleton className="h-3 w-[75px]" />
            </div>
          </div>
          <Skeleton className="h-2 w-[30px]" />
        </div>
      ))}
    </>
  );
};

export default AuthorCardSkeleton;
