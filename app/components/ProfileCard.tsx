import Image from "next/image";

import { ProfileCardProps } from "@/Types";
import LoaderSpiner from "./LoaderSpiner";

const ProfileCard = ({
  imageUrl,
  userFirstName,
  listeners,
}: ProfileCardProps) => {
  if (!imageUrl) return <LoaderSpiner />;

  return (
    <div className="mt-6 flex flex-col gap-6 max-md:items-center md:flex-row">
      <Image
        src={imageUrl}
        width={250}
        height={250}
        alt="Profile image"
        className="aspect-square rounded-lg"
      />
      <div className="flex flex-col max-md:items-center">
        <div className="flex flex-col gap-2.5">
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
        <figure className="flex gap-3 py-6">
          <Image
            src="/icons/headphones.svg"
            width={20}
            height={20}
            alt="headphone"
          />
          <h2>
            {listeners} &nbsp;
            <span className="font-normal text-white-2">listeners</span>
          </h2>
        </figure>
      </div>
    </div>
  );
};

export default ProfileCard;
