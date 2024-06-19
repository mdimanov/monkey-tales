import React from "react";
import Image from "next/image";
import { TaleCardProps } from "@/Types";
import { useRouter } from "next/navigation";

const TaleCard = ({ title, description, imgUrl, taleId }: TaleCardProps) => {
  const router = useRouter();

  const handleViews = () => {
    // increase views
    router.push(`/tales/${taleId}`, {
      scroll: true,
    });
  };

  return (
    <div className="cursor-pointer" onClick={handleViews}>
      <figure className="flex flex-col gap-2">
        <Image
          src={imgUrl}
          alt={title}
          width={170}
          height={170}
          className="aspect-square h-fit w-full rounded-xl 2xl:size-[200px]"
        />
        <div className="flex flex-col">
          <h2 className="text-16 truncate text-white-1 font-bold">{title}</h2>
          <p className="text-12 text-white-500">{description}</p>
        </div>
      </figure>
    </div>
  );
};

export default TaleCard;
