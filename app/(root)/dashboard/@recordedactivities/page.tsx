"use client";

import React, { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Activity } from "lucide-react";
import { useActivityStore } from "@/stores/useActivityStore";

const Page = () => {
  const { getActivities, allActivities } = useActivityStore();

  useEffect(() => {
    getActivities();
  }, [getActivities]);

  const activityCount = Array.isArray(allActivities)
    ? allActivities.length
    : 0;

  return (
    <div className="p-2">
      <Card className=" borde  w-70 md:w-fullr border-rose-100 bg-rose-50/60 shadow-none">
        <CardContent className="p-7">

          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-rose-100">
              <Activity className="h-7 w-7 text-rose-600" />
            </div>

            <p className="text-xl font-semibold text-gray-900">
              Activities Logged
            </p>
          </div>

          <div className="mt-10">
            <span className="text-5xl font-medium tracking-tight text-gray-900">
              {activityCount}
            </span>
          </div>

          <p className="mt-8 text-base font-medium text-rose-600">
            Activities recorded so far
          </p>

        </CardContent>
      </Card>
    </div>
  );
};

export default Page;