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
          className="flex w-full items-center justify-center md:justify-between space-x-3"
        >
          <div className="flex flex-col items-center md:items-start md:flex-row mb-6 md:mb-0 gap-3 md:gap-4">
            <Skeleton className="h-[90px] w-[90px] rounded-xl" />
            <div className="flex flex-col items-center md:items-start gap-2 md:gap-4 mt-3">
              <Skeleton className="h-4 w-[115px] md:w-[145px]" />
              <Skeleton className="h-2 w-[45px] md:w-[85px]" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default AuthorSmallCardSkeleton;
