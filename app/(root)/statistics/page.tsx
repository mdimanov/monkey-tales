"use client";
import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Bar, BarChart, LabelList, YAxis } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import LoaderSpiner from "@/app/components/LoaderSpiner";
import { TaleProps } from "@/Types";
import { formatDuration } from "@/lib/formatTime";

const StatisticsPage = () => {
  const allTales = useQuery(api.tales.getAllTales, {});
  const allUsers = useQuery(api.users.getAllUsers, {});

  if (!allTales || !allUsers) return <LoaderSpiner />;

  // Define the type for the voice count object
  type VoiceCount = {
    [key: string]: number;
  };

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

  const totalDurationMilliseconds = getTotalDuration(allTales as TaleProps[]);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="main_title">Statistics</h1>
      <div className="stats_grid">
        <div className="rounded-xl bg-black-2 text-card-foreground shadow">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Tales</h3>
            <Image
              src="/icons/tale.svg"
              width={32}
              height={32}
              alt="Tale"
              className="h-8 w-8 text-muted-foreground"
            />
          </div>
          <div className="p-6 pt-0">
            <div className="text-4xl text-white-1 font-bold">
              {allTales?.length}
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-black-2 text-card-foreground shadow">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Authors</h3>
            <Image
              src="/icons/authors.png"
              width={32}
              height={32}
              alt="headphone"
              className="h-8 w-8 text-muted-foreground"
            />
          </div>
          <div className="p-6 pt-0">
            <div className="text-4xl text-white-1 font-bold">
              {allUsers?.length}
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-black-2 text-card-foreground shadow">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">
              Tales Duration
            </h3>
            <Image
              src="/icons/clock.svg"
              width={32}
              height={32}
              alt="headphone"
              className="h-8 w-8 text-muted-foreground"
            />
          </div>
          <div className="p-6 pt-0">
            <div className="text-4xl text-white-1 font-bold">
              {formatDuration(totalDurationMilliseconds)}
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-black-2 text-card-foreground shadow">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Listeners</h3>
            <Image
              src="/icons/headphones.svg"
              width={32}
              height={32}
              alt="headphone"
              className="h-8 w-8 text-muted-foreground"
            />
          </div>
          <div className="p-6 pt-0">
            <div className="text-4xl text-white-1 font-bold">{totalViews}</div>
          </div>
        </div>
      </div>
      <h2 className="text-lg font-medium text-white-1">AI voice usage</h2>
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
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default StatisticsPage;
