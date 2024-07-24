"use client";
import Image from "next/image";

import { SmallProfileCardProps } from "@/Types";
import { useRouter } from "next/navigation";
import LoaderSpiner from "./LoaderSpiner";

const SmallProfileCard = ({
  imageUrl,
  userFirstName,
  tales,
  clerkId,
}: SmallProfileCardProps) => {
  const router = useRouter();

  if (!imageUrl) return <LoaderSpiner />;

  return (
    <div
      className="w-full cursor-pointer transition-all duration-500 rounded-xl border-transparent hover:border-violet-800 hover:bg-lates-focus border-l-4 flex flex-col gap-3 md:gap-4 max-md:items-center md:flex-row"
      onClick={() => router.push(`/profile/${clerkId}`)}
    >
      <Image
        src={imageUrl}
        width={90}
        height={90}
        alt="Profile image"
        className="aspect-square object-cover rounded-xl"
      />
      <div className="flex w-full flex-col max-md:items-center mt-0 md:mt-2">
        <div className="flex w-full flex-col gap-1">
          <h1 className="text-14 md:text-16 text-center md:text-left font-extrabold tracking-[-0.32px] text-white-1">
            {userFirstName}
          </h1>
        </div>
        <figure className="flex w-full justify-center md:justify-start gap-3 mt-1">
          <Image src="/icons/tale.svg" width={20} height={20} alt="headphone" />
          <h2>
            {tales} &nbsp;
            <span className="font-normal text-white-2">tales</span>
          </h2>
        </figure>
      </div>
    </div>
  );
};

export default SmallProfileCard;
