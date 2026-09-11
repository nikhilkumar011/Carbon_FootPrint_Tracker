"use client";

import React, { useEffect, useMemo } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Gauge } from "lucide-react";
import { useActivityStore } from "@/stores/useActivityStore";

type Activity = {
  totalEmission?: number | null;
};

const Page = () => {
  const { getActivities, allActivities } = useActivityStore();

  useEffect(() => {
    getActivities();
  }, [getActivities]);

  const averageEmission = useMemo(() => {
    if (!Array.isArray(allActivities) || allActivities.length === 0) {
      return 0;
    }

    const total = allActivities.reduce(
      (sum: number, activity: Activity) =>
        sum + Number(activity.totalEmission || 0),
      0
    );

    return Number((total / allActivities.length).toFixed(2));
  }, [allActivities]);

  return (
    <div className="p-2">
      <Card className=" border w-70 md:w-full border-amber-100 bg-amber-50/60 shadow-none">
        <CardContent className="p-7">

          {/* Icon + Title */}
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-amber-100">
              <Gauge className="h-7 w-7 text-amber-600" />
            </div>

            <p className="text-xl font-semibold text-gray-900">
              Average Emission
            </p>
          </div>

          {/* Average */}
          <div className="mt-10 flex items-baseline gap-2">
            <span className="text-5xl font-medium tracking-tight text-gray-900">
              {averageEmission}
            </span>

            <span className="text-lg text-gray-600">
              kg CO₂e
            </span>
          </div>

          {/* Bottom text */}
          <p className="mt-8 text-base font-medium text-amber-600">
            Your average daily footprint
          </p>

        </CardContent>
      </Card>
    </div>
  );
};

export default Page;