import React from "react";
import Image from "next/image";
import { TaleCardProps } from "@/Types";
import { useRouter } from "next/navigation";
import { truncateText } from "@/lib/truncateText";

const TaleCard = ({
  title,
  description,
  views,
  imgUrl,
  taleId,
}: TaleCardProps) => {
  const router = useRouter();

  const handleViews = () => {
    router.push(`/tales/${taleId}`, {
      scroll: true,
    });
  };

  return (
    <div className="cursor-pointer" onClick={handleViews}>
      <figure className="flex flex-col gap-2 group">
        <div className="relative">
          <Image
            src={imgUrl}
            alt={title}
            width={200}
            height={200}
            className="aspect-square h-fit w-full rounded-xl transition-all duration-500 shadow group-hover:shadow-purple"
          />
          <div className="absolute bottom-0 left-0 bg-violet-900 transition-all duration-500 rounded-tr-xl opacity-0 group-hover:opacity-100">
            <div className="flex items-end gap-2 h-5 min-w-[60px] sm:min-w-[80px] px-4">
              <Image
                src="/icons/headphones.svg"
                width={16}
                height={16}
                alt="headphone"
              />
              <p className="min-w-[15px] text-xs text-white-1 text-right">
                {views}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <h2 className="text-16 pb-2 text-white-1 font-bold truncate">
            {title}
          </h2>
          <p className="text-12 text-white-500">
            {truncateText(description, 15)}
          </p>
        </div>
      </figure>
    </div>
  );
};

export default TaleCard;
