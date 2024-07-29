import Image from "next/image";

type StatsCardProps = {
  title: string;
  value: number | string;
  iconSrc: string;
};

const StatsCard: React.FC<StatsCardProps> = ({ title, value, iconSrc }) => {
  return (
    <div className="rounded-xl bg-black-2 text-card-foreground shadow">
      <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 className="tracking-tight text-sm font-medium">{title}</h3>
        <Image
          src={iconSrc}
          width={32}
          height={32}
          alt="Stats icon"
          className="h-8 w-8 text-muted-foreground"
        />
      </div>
      <div className="p-6 pt-0">
        <div className="text-4xl text-white-1 font-bold">{value}</div>
      </div>
    </div>
  );
};

export default StatsCard;
