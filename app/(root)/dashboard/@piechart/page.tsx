"use client";

import { Pie, PieChart, LabelList } from "recharts";
import { useEffect, useMemo, useState } from "react";
import { useActivityStore } from "@/stores/useActivityStore";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export const description = "A pie chart with a label list";

interface Activity {
  id: string;
  totalTransport?: number;
  totalFood?: number;
  totalEnergy?: number;
  totalWaste?: number;
  [key: string]: unknown;
}

const chartConfig = {
  emission: {
    label: "Emission",
  },
  transport: {
    label: "Transport",
    color: "var(--chart-1)",
  },
  food: {
    label: "Food",
    color: "var(--chart-2)",
  },
  energy: {
    label: "Energy",
    color: "var(--chart-3)",
  },
  waste: {
    label: "Waste",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

export default function ChartPieLabelList() {
  const { getActivities, allActivities } = useActivityStore();

  useEffect(() => {
    getActivities();
  }, [getActivities]);

  const chartData = useMemo(() => {
    if (!Array.isArray(allActivities) || allActivities.length === 0) {
      return [];
    }

    const totals = (allActivities as Activity[]).reduce(
      (acc, activity) => {
        acc.transport += Number(activity.totalTransport || 0);
        acc.food += Number(activity.totalFood || 0);
        acc.energy += Number(activity.totalEnergy || 0);
        acc.waste += Number(activity.totalWaste || 0);
        return acc;
      },
      { transport: 0, food: 0, energy: 0, waste: 0 }
    );

    return [
      {
        category: "transport",
        emission: Number(totals.transport.toFixed(2)),
        fill: "var(--color-transport)",
      },
      {
        category: "food",
        emission: Number(totals.food.toFixed(2)),
        fill: "var(--color-food)",
      },
      {
        category: "energy",
        emission: Number(totals.energy.toFixed(2)),
        fill: "var(--color-energy)",
      },
      {
        category: "waste",
        emission: Number(totals.waste.toFixed(2)),
        fill: "var(--color-waste)",
      },
    ].filter((entry) => entry.emission > 0);
  }, [allActivities]);

  return (
    <Card className="flex flex-col w-70 md:w-150">
      <CardHeader className="items-center pb-0">
        <CardTitle>Category Wise Emission</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {chartData.length === 0 ? (
          <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
            No emission data yet
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-background"
          >
            <PieChart>
              <ChartTooltip
                content={<ChartTooltipContent nameKey="emission" hideLabel />}
              />
              <Pie data={chartData} dataKey="emission">
                <LabelList
                  dataKey="category"
                  className="fill-background"
                  stroke="none"
                  fontSize={12}
                  formatter={(value: keyof typeof chartConfig) =>
                    chartConfig[value]?.label
                  }
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}