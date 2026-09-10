"use client";

import { useEffect } from "react";
import {
  Car,
  Bike,
  Bus,
  TrainFront,
  Plane,
  Drumstick,
  Milk,
  Salad,
  Leaf,
  Zap,
  Flame,
  Trash2,
  FileText,
  Recycle,
} from "lucide-react";

import { useActivityStore } from "@/stores/useActivityStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

interface ActivityRecord {
  id: string;
  createdAt: string;
  totalEmission: number;
  carDistance: number;
  bikeDistance: number;
  busDistance: number;
  trainDistance: number;
  flightDistance: number;
  chicken: number;
  dairy: number;
  vegMeals: number;
  organic: number;
  electricity: number;
  lpg: number;
  naturalGas: number;
  paper: number;
  plastic: number;
  others: number;
  [key: string]: unknown;
}

interface StatItem {
  icon: React.ElementType;
  label: string;
  value: number;
  unit: string;
}

function StatRow({ icon: Icon, label, value, unit }: StatItem) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 shrink-0">
          <Icon className="h-4 w-4 text-gray-600" />
        </div>
        <span className="text-sm text-gray-700">{label}</span>
      </div>
      <span className="text-sm font-medium text-gray-900">
        {value} <span className="text-gray-400 font-normal">{unit}</span>
      </span>
    </div>
  );
}

function CategorySection({
  title,
  items,
}: {
  title: string;
  items: StatItem[];
}) {
  const visibleItems = items.filter((item) => item.value > 0);

  if (visibleItems.length === 0) return null;

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">
        {title}
      </p>
      <div className="divide-y divide-gray-100">
        {visibleItems.map((item) => (
          <StatRow key={item.label} {...item} />
        ))}
      </div>
    </div>
  );
}

export default function RecentActivities() {
  const { getDataByDate, data, todaysDataAvailable } = useActivityStore();

  useEffect(() => {
    getDataByDate();
  }, [getDataByDate]);

  const activity: ActivityRecord | undefined = data?.data;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Today&apos;s Activity</CardTitle>
        <CardDescription>
          A snapshot of what you&apos;ve logged today
        </CardDescription>
      </CardHeader>

      <CardContent>
        {!todaysDataAvailable ? (
          <div className="space-y-3">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-3/4" />
          </div>
        ) : !activity ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Leaf className="h-8 w-8 text-gray-300 mb-2" />
            <p className="text-sm text-gray-500">
              No activity logged today yet.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg bg-emerald-50 px-4 py-3">
              <span className="text-sm font-medium text-emerald-800">
                Total Emission Today
              </span>
              <Badge className="bg-emerald-600 hover:bg-emerald-600 text-white">
                {activity.totalEmission} kg CO₂
              </Badge>
            </div>

            <CategorySection
              title="Transport"
              items={[
                { icon: Car, label: "Car", value: activity.carDistance, unit: "km" },
                { icon: Bike, label: "Bike", value: activity.bikeDistance, unit: "km" },
                { icon: Bus, label: "Bus", value: activity.busDistance, unit: "km" },
                { icon: TrainFront, label: "Train", value: activity.trainDistance, unit: "km" },
                { icon: Plane, label: "Flight", value: activity.flightDistance, unit: "km" },
              ]}
            />

            <Separator />

            <CategorySection
              title="Food"
              items={[
                { icon: Drumstick, label: "Chicken", value: activity.chicken, unit: "meals" },
                { icon: Milk, label: "Dairy", value: activity.dairy, unit: "servings" },
                { icon: Salad, label: "Veg meals", value: activity.vegMeals, unit: "meals" },
                { icon: Leaf, label: "Organic", value: activity.organic, unit: "meals" },
              ]}
            />

            <Separator />

            <CategorySection
              title="Energy"
              items={[
                { icon: Zap, label: "Electricity", value: activity.electricity, unit: "kWh" },
                { icon: Flame, label: "LPG", value: activity.lpg, unit: "kg" },
                { icon: Flame, label: "Natural gas", value: activity.naturalGas, unit: "m³" },
              ]}
            />

            <Separator />

            <CategorySection
              title="Waste"
              items={[
                { icon: FileText, label: "Paper", value: activity.paper, unit: "kg" },
                { icon: Trash2, label: "Plastic", value: activity.plastic, unit: "kg" },
                { icon: Recycle, label: "Others", value: activity.others, unit: "kg" },
              ]}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}