"use client";

import React, { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Cloud } from "lucide-react";
import { useActivityStore } from "@/stores/useActivityStore";

const Page = () => {
  const { getActivities, allActivities } = useActivityStore();

  useEffect(() => {
    getActivities();
  }, [getActivities]);

  const totalEmission =
    Array.isArray(allActivities)
      ? allActivities.reduce(
          (sum, activity) =>
            sum + Number(activity.totalEmission || 0),
          0
        )
      : 0;

  return (
    <div className="p-2">
      <Card className=" border  w-70 md:w-full border-blue-100 bg-blue-50/60 shadow-none">
        <CardContent className="p-7">

          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100">
              <Cloud className="h-7 w-7 text-blue-600" />
            </div>

            <p className="text-xl font-semibold text-gray-900">
              Total Emissions
            </p>
          </div>

          <div className="mt-10 flex items-baseline gap-2">
            <span className="text-5xl font-medium tracking-tight text-gray-900">
              {totalEmission.toFixed(2)}
            </span>

            <span className="text-lg text-gray-600">
              kg CO₂e
            </span>
          </div>

          <p className="mt-8 text-base font-medium text-blue-600">
            Total footprint recorded
          </p>

        </CardContent>
      </Card>
    </div>
  );
};

export default Page;