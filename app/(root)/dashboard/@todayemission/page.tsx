"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Leaf } from "lucide-react";
import { useActivityStore } from "@/stores/useActivityStore";

const TodayEmission = () => {
  const { getDataByDate, data } = useActivityStore();
  const [totalEmission, setTotalEmission] = useState(0);

  useEffect(() => {
    getDataByDate();
  }, [getDataByDate]);

  useEffect(() => {
    setTotalEmission(data?.data?.totalEmission ?? 0);
  }, [data]);

  return (
   <div className="p-2">
  <Card className=" border  w-70 md:w-full border-green-100 bg-green-50/60 shadow-none">
    <CardContent className="p-7">

      {/* Icon + Title */}
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-100">
          <Leaf className="h-7 w-7 text-green-600" />
        </div>

        <p className="text-xl font-semibold text-gray-900">
          Today's Emissions
        </p>
      </div>

      {/* Emission */}
      <div className="mt-10 flex items-baseline gap-2">
        <span className="text-5xl font-medium tracking-tight text-gray-900">
          {totalEmission ?? 0}
        </span>

        <span className="text-lg text-gray-600">
          kg CO₂e
        </span>
      </div>

      {/* Bottom text */}
      <p className="mt-8 text-base font-medium text-green-600">
        Your footprint for today
      </p>

    </CardContent>
  </Card>
</div>
  );
};

export default TodayEmission;