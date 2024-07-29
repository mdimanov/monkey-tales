"use client";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Bar, BarChart, LabelList, YAxis } from "recharts";
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

  function getTotalDuration(data: TaleProps[]) {
    const totalMilliseconds = data.reduce(
      (total, item) => total + item.audioDuration * 1000,
      0
    );
    return totalMilliseconds;
  }

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
      <h2 className="text-lg font-medium text-white-1">AI Voice Preference</h2>
      <ChartContainer
        config={chartConfig}
        className="min-h-[200px] max-h-[380px] w-full"
      >
        <BarChart accessibilityLayer data={voiceUsage}>
          <YAxis />
          <Bar dataKey="usage" fill="var(--color-usage)" radius={4}>
            <LabelList dataKey="usage" position="top" />
            <LabelList
              dataKey="voiceType"
              position="insideBottom"
              offset={10}
              style={{ fill: "white", fontSize: "16px" }}
            />
          </Bar>
          <ChartTooltip content={<ChartTooltipContent />} />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default StatisticsPage;
