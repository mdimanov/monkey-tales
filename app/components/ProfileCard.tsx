import Image from "next/image";

import { ProfileCardProps } from "@/Types";
import LoaderSpiner from "./LoaderSpiner";

const ProfileCard = ({
  imageUrl,
  userFirstName,
  listeners,
  tales,
  mostListenedTaleTitle,
}: ProfileCardProps) => {
  if (!imageUrl) return <LoaderSpiner />;

  return (
    <div className="mt-6 flex flex-col gap-6 max-md:items-center md:flex-row">
      <Image
        src={imageUrl}
        width={200}
        height={200}
        alt="Profile image"
        className="aspect-square object-cover rounded-lg"
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
          <p>
            <strong className="text-white-1">Most listen tale:</strong>{" "}
            {mostListenedTaleTitle}
          </p>
        </div>
        <figure className="flex gap-3 pt-6 pb-2">
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
        <figure className="flex gap-3">
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

export default ProfileCard;
