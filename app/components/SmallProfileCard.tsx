import Image from "next/image";

import { SmallProfileCardProps } from "@/Types";
import LoaderSpiner from "./LoaderSpiner";

const SmallProfileCard = ({
  imageUrl,
  userFirstName,
  tales,
}: SmallProfileCardProps) => {
  if (!imageUrl) return <LoaderSpiner />;

  return (
    <div className="mt-6 w-full flex flex-col gap-6 max-md:items-center md:flex-row">
      <Image
        src={imageUrl}
        width={130}
        height={130}
        alt="Profile image"
        className="aspect-square object-cover rounded-xl"
      />
      <div className="flex w-full flex-col max-md:items-center">
        <div className="flex w-full flex-col gap-1">
          <figure className="flex gap-2 max-md:justify-center">
            <Image
              src="/icons/verified.png"
              width={22}
              height={22}
              alt="verified"
            />
            <h2 className="text-14 font-medium text-white-2">
              Verified Creator
            </h2>
          </figure>
          <h1 className="text-32 font-extrabold tracking-[-0.32px] text-white-1">
            {userFirstName}
          </h1>
        </div>
        <figure className="flex w-full gap-3 mt-3">
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
