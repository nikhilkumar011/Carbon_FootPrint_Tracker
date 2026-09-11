"use client";

import { useEffect, useMemo } from "react";
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
  FileText,
  Trash2,
  Recycle,
  CalendarDays,
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
import { Skeleton } from "@/components/ui/skeleton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ActivityRecord {
  id: string;
  createdAt: string;
  totalEmission: number;
  totalTransport: number;
  totalFood: number;
  totalEnergy: number;
  totalWaste: number;
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

interface DetailItem {
  icon: React.ElementType;
  label: string;
  value: number;
  unit: string;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function ratingForEmission(total: number) {
  if (total < 8) return { label: "Low", style: "bg-emerald-100 text-emerald-700" };
  if (total < 16) return { label: "Moderate", style: "bg-amber-100 text-amber-700" };
  return { label: "High", style: "bg-red-100 text-red-700" };
}

function DetailRow({ icon: Icon, label, value, unit }: DetailItem) {
  if (!value) return null;
  return (
    <div className="flex items-center justify-between py-1.5">
      <div className="flex items-center gap-2">
        <Icon className="h-3.5 w-3.5 text-gray-400" />
        <span className="text-sm text-gray-600">{label}</span>
      </div>
      <span className="text-sm font-medium text-gray-800">
        {value} <span className="text-gray-400 font-normal">{unit}</span>
      </span>
    </div>
  );
}

function DetailGroup({
  title,
  total,
  items,
}: {
  title: string;
  total: number;
  items: DetailItem[];
}) {
  const visible = items.filter((i) => i.value > 0);
  if (visible.length === 0) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
          {title}
        </p>
        <span className="text-xs font-medium text-gray-500">
          {total.toFixed(2)} kg CO₂
        </span>
      </div>
      <div className="divide-y divide-gray-50">
        {visible.map((item) => (
          <DetailRow key={item.label} {...item} />
        ))}
      </div>
    </div>
  );
}

export default function HistoryPage() {
  const { getActivities, allActivities } = useActivityStore() as {
    getActivities: () => Promise<void>;
    allActivities: ActivityRecord[] | null;
  };

  useEffect(() => {
    getActivities();
  }, [getActivities]);

  const sortedActivities = useMemo(() => {
    if (!Array.isArray(allActivities)) return [];
    return [...allActivities].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [allActivities]);

  const isLoading = allActivities === null;

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
          Activity History
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          A detailed log of every entry you&apos;ve recorded
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          <Skeleton className="h-16 w-full rounded-xl" />
          <Skeleton className="h-16 w-full rounded-xl" />
          <Skeleton className="h-16 w-full rounded-xl" />
        </div>
      ) : sortedActivities.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <CalendarDays className="h-8 w-8 text-gray-300 mb-3" />
            <p className="text-sm text-gray-500">
              No activity history yet. Start logging to see it here.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>{sortedActivities.length} entries</CardTitle>
            <CardDescription>
              Sorted from most recent to oldest
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion multiple={false} className="w-full">
              {sortedActivities.map((activity) => {
                const rating = ratingForEmission(activity.totalEmission);
                return (
                  <AccordionItem key={activity.id} value={activity.id}>
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex flex-1 items-center justify-between pr-4">
                        <div className="flex flex-col items-start text-left">
                          <span className="text-sm font-medium text-gray-900">
                            {formatDate(activity.createdAt)}
                          </span>
                          <span className="text-xs text-gray-400">
                            {new Date(activity.createdAt).toLocaleTimeString(
                              "en-US",
                              { hour: "2-digit", minute: "2-digit" }
                            )}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={rating.style}>{rating.label}</Badge>
                          <span className="text-sm font-semibold text-gray-900 tabular-nums">
                            {activity.totalEmission} kg
                          </span>
                        </div>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent>
                      <div className="space-y-4 pt-2 pb-1">
                        <DetailGroup
                          title="Transport"
                          total={activity.totalTransport}
                          items={[
                            { icon: Car, label: "Car", value: activity.carDistance, unit: "km" },
                            { icon: Bike, label: "Bike", value: activity.bikeDistance, unit: "km" },
                            { icon: Bus, label: "Bus", value: activity.busDistance, unit: "km" },
                            { icon: TrainFront, label: "Train", value: activity.trainDistance, unit: "km" },
                            { icon: Plane, label: "Flight", value: activity.flightDistance, unit: "km" },
                          ]}
                        />
                        <DetailGroup
                          title="Food"
                          total={activity.totalFood}
                          items={[
                            { icon: Drumstick, label: "Chicken", value: activity.chicken, unit: "meals" },
                            { icon: Milk, label: "Dairy", value: activity.dairy, unit: "servings" },
                            { icon: Salad, label: "Veg meals", value: activity.vegMeals, unit: "meals" },
                            { icon: Leaf, label: "Organic", value: activity.organic, unit: "meals" },
                          ]}
                        />
                        <DetailGroup
                          title="Energy"
                          total={activity.totalEnergy}
                          items={[
                            { icon: Zap, label: "Electricity", value: activity.electricity, unit: "kWh" },
                            { icon: Flame, label: "LPG", value: activity.lpg, unit: "kg" },
                            { icon: Flame, label: "Natural gas", value: activity.naturalGas, unit: "m³" },
                          ]}
                        />
                        <DetailGroup
                          title="Waste"
                          total={activity.totalWaste}
                          items={[
                            { icon: FileText, label: "Paper", value: activity.paper, unit: "kg" },
                            { icon: Trash2, label: "Plastic", value: activity.plastic, unit: "kg" },
                            { icon: Recycle, label: "Others", value: activity.others, unit: "kg" },
                          ]}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </CardContent>
        </Card>
      )}
    </div>
  );
}