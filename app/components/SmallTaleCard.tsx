import React from "react";
import Image from "next/image";
import { SmallTaleCardProps } from "@/Types";
import { formatTime } from "@/lib/formatTime";
import { useRouter } from "next/navigation";

const SmallTaleCard = ({
  title,
  imgUrl,
  author,
  audioDuration,
  views,
  taleId,
}: SmallTaleCardProps) => {
  const router = useRouter();

  const handleViews = () => {
    // increase views
    router.push(`/tales/${taleId}`, {
      scroll: true,
    });
  };

  return (
    <div
      className="cursor-pointer transition-all duration-500 rounded-xl flex items-center font-semibold border-transparent hover:border-violet-800 hover:bg-lates-focus border-l-4"
      onClick={handleViews}
    >
      <figure className="flex w-full justify-between gap-2">
        <div className="flex items-center gap-2">
          <Image
            src={imgUrl}
            alt={title}
            width={50}
            height={50}
            className="aspect-square object-cover h-fit rounded-xl"
          />
          <div className="flex flex-col min-w-[120px] sm:min-w-[200px]">
            <h2 className="text-14  text-white-1 font-bold truncate">
              {title}
            </h2>
            <p className="text-12 text-slate-400">{author}</p>
          </div>
        </div>
        <div className="flex gap-2 sm:gap-8">
          <div className="flex items-center justify-end gap-2 min-w-[60px] sm:min-w-[80px]">
            <Image
              src="/icons/headphones.svg"
              width={20}
              height={20}
              alt="headphone"
            />
            <p className="min-w-[15px] text-right">{views}</p>
          </div>
          <div className="hidden items-center justify-end gap-2 min-w-[80px] md:flex">
            <Image src="/icons/clock.svg" width={20} height={20} alt="clock" />
            <p className="min-w-[40px] text-right">
              {formatTime(audioDuration)}
            </p>
          </div>
        </div>
      </figure>
    </div>
  );
};

export default SmallTaleCard;
