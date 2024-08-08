"use client";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  Bar,
  BarChart,
  LabelList,
  Pie,
  ResponsiveContainer,
  PieChart,
  Cell,
  LabelProps,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import ChartTooltipContent from "@/app/components/ChartTooltipContent";
import LoaderSpiner from "@/app/components/LoaderSpiner";
import { TaleProps } from "@/Types";
import { formatDuration } from "@/lib/formatTime";
import StatsCard from "@/app/components/StatsCard";

// Define the type for the voice count object
type VoiceCount = {
  [key: string]: number;
};

const StatisticsPage = () => {
  const allTales = useQuery(api.tales.getAllTales, {});
  const allUsers = useQuery(api.users.getAllUsers, {});

  if (!allTales || !allUsers) return <LoaderSpiner />;

  // Create an object to count the occurrences of each voice type
  const voiceCount: VoiceCount = {};

  // Iterate through each tale
  allTales.forEach((tale) => {
    const voiceType = tale.voiceType;
    if (voiceCount[voiceType]) {
      voiceCount[voiceType]++;
    } else {
      voiceCount[voiceType] = 1;
    }
  });

  // Convert the count object to an array of objects with voiceType and usage
  const voiceUsage = Object.keys(voiceCount).map((voiceType) => ({
    voiceType: voiceType,
    usage: voiceCount[voiceType],
  }));

  const chartConfig = {
    usage: {
      label: "Usage",
      color: "#7C3AED",
    },
  } satisfies ChartConfig;

  const totalViews = allTales.reduce((sum, tale) => sum + tale.views, 0);

  const getTotalDuration = (data: TaleProps[]): number => {
    const totalMilliseconds = data.reduce(
      (total, item) => total + item.audioDuration * 1000,
      0
    );
    return totalMilliseconds;
  };

  const totalDuration = formatDuration(
    getTotalDuration(allTales as TaleProps[])
  );

  const statsData = [
    {
      id: 1,
      title: "Tales",
      value: allTales?.length,
      iconSrc: "/icons/tale.svg",
    },
    {
      id: 2,
      title: "Authors",
      value: allUsers.length,
      iconSrc: "/icons/authors.png",
    },
    {
      id: 3,
      title: "Tales Duration",
      value: totalDuration,
      iconSrc: "/icons/clock.svg",
    },
    {
      id: 4,
      title: "Listeners",
      value: totalViews,
      iconSrc: "/icons/headphones.svg",
    },
  ];

  // Calculate total likes and dislikes
  const totalLikes = allTales.reduce((sum, tale) => sum + tale.likesCount, 0);
  const totalDislikes = allTales.reduce(
    (sum, tale) => sum + tale.dislikesCount,
    0
  );

  const pieData = [
    {
      name: "👍",
      value: totalLikes,
    },
    {
      name: "👎",
      value: totalDislikes,
    },
  ];

  const COLORS = ["#00C49F", "#FF5B5B "];

  // Define the type for the props passed to the custom label function
  type CustomizedLabelProps = LabelProps & {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
    index: number;
  };

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel: React.FC<CustomizedLabelProps> = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    index,
  }: CustomizedLabelProps) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <g>
        <text
          x={x + 20}
          y={y - 10} // Adjusted position relative to image
          fill="white"
          textAnchor="start"
          dominantBaseline="central"
          style={{ fontSize: "28px" }} // Increase font size here
        >
          {`${pieData[index].name}`}
        </text>
        <text
          x={x + 60}
          y={y - 10} // Adjusted position below the name
          fill="white"
          textAnchor="start"
          dominantBaseline="central"
          style={{ fontSize: "14px" }} // Optional: smaller font size for the value
        >
          {`${pieData[index].value}`}
        </text>
      </g>
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="main_title">Statistics</h1>
      <div className="stats_grid">
        {statsData.map((stat) => (
          <StatsCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            iconSrc={stat.iconSrc}
          />
        ))}
      </div>
      <div className="flex flex-col xl:flex-row gap-6">
        <div className="w-full xl:w-3/5">
          <h2 className="text-lg font-medium text-white-1">
            AI Voice Preference
          </h2>
          <ChartContainer
            config={chartConfig}
            className="xl:min-h-[250px] min-h-[100px] max-h-[380px] w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart accessibilityLayer data={voiceUsage}>
                <Bar dataKey="usage" fill="var(--color-usage)" radius={4}>
                  <LabelList dataKey="usage" position="top" />
                  <LabelList
                    dataKey="voiceType"
                    position="insideBottom"
                    offset={10}
                    className="hidden sm:block"
                    style={{ fill: "white", fontSize: "16px" }}
                  />
                </Bar>
                <ChartTooltip content={<ChartTooltipContent />} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        <div className="w-full xl:w-2/5">
          <h2 className="text-lg font-medium text-white-1">Users Reactions</h2>
          <ChartContainer
            config={chartConfig}
            className="xl:min-h-[270px] min-h-[160px] max-h-[380px] w-full xl:mt-36"
          >
            <PieChart>
              <Pie
                data={pieData}
                cx={160}
                cy={180}
                startAngle={180}
                endAngle={0}
                innerRadius={90}
                outerRadius={150}
                paddingAngle={5}
                dataKey="value"
                labelLine={false}
                label={renderCustomizedLabel}
                stroke="none"
                style={{ pointerEvents: "none" }}
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    style={{ pointerEvents: "none" }}
                  />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
