"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
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
import { useEffect, useState } from "react";

export const description = "Emission over time";

const chartConfig = {
  emission: {
    label: "Emission",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

interface Activity {
  id: string;
  createdAt: string;
  totalEmission: number;
  [key: string]: unknown;
}

interface ChartPoint {
  entry: string;
  emission: number;
}

export default function ChartLineLinear() {
  const { getActivities, allActivities } = useActivityStore();

  const [chartData, setChartData] = useState<ChartPoint[]>([]);

  useEffect(() => {
    getActivities();
  }, [getActivities]);

  useEffect(() => {
    if (!Array.isArray(allActivities) || allActivities.length === 0) {
      setChartData([]);
      return;
    }

    const formattedData = (allActivities as Activity[]).map(
      (activity, index) => ({
        entry: `${index + 1}`,
        emission: Number(activity.totalEmission || 0),
      })
    );

    setChartData(formattedData);
  }, [allActivities]);

  return (
    <Card className="md:h-100  w-70 md:w-full">
      <CardHeader>
        <CardTitle>Emission Over Time</CardTitle>
      </CardHeader>

      <CardContent>
        {chartData.length === 0 ? (
          <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
            No emission data yet
          </div>
        ) : (
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />

              <XAxis
                dataKey="entry"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />

              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />

              <Line
                dataKey="emission"
                type="linear"
                stroke="var(--color-emission)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}