"use client";

import { useState } from "react";
import { Sparkles, TrendingDown, RefreshCw } from "lucide-react";
import { useActivityStore } from "@/stores/useActivityStore";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

interface Recommendation {
  category: "Transport" | "Food" | "Energy" | "Waste";
  title: string;
  suggestion: string;
  impact: "High" | "Medium" | "Low";
  estimatedSaving?: string;
}

interface RecommendationResponse {
  summary: string;
  rating: "Excellent" | "Good" | "Fair" | "Needs Improvement";
  recommendations: Recommendation[];
}

const impactStyles: Record<string, string> = {
  High: "bg-red-100 text-red-700 hover:bg-red-100",
  Medium: "bg-amber-100 text-amber-700 hover:bg-amber-100",
  Low: "bg-gray-100 text-gray-600 hover:bg-gray-100",
};

const ratingStyles: Record<string, string> = {
  Excellent: "bg-emerald-100 text-emerald-700",
  Good: "bg-emerald-100 text-emerald-700",
  Fair: "bg-amber-100 text-amber-700",
  "Needs Improvement": "bg-red-100 text-red-700",
};

export default function RecommendationsCard() {
  const { data, getRecommendations, recommendations, recommendationsLoading } =
    useActivityStore() as {
      data: any;
      getRecommendations: (activity: any) => Promise<any>;
      recommendations: RecommendationResponse | null;
      recommendationsLoading: boolean;
    };

  const activity = data?.data;

  const handleAnalyze = () => {
    if (!activity) return;
    getRecommendations(activity);
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-emerald-600" />
            AI Recommendations
          </CardTitle>
          <CardDescription>
            Personalized tips based on today&apos;s activity
          </CardDescription>
        </div>

        {recommendations && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleAnalyze}
            disabled={recommendationsLoading}
          >
            <RefreshCw
              className={`h-4 w-4 ${recommendationsLoading ? "animate-spin" : ""}`}
            />
          </Button>
        )}
      </CardHeader>

      <CardContent>
        {!activity ? (
          <p className="text-sm text-gray-500 py-6 text-center">
            Log today&apos;s activity first to get recommendations.
          </p>
        ) : recommendationsLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        ) : !recommendations ? (
          <div className="flex flex-col items-center justify-center py-8 text-center gap-3">
            <Sparkles className="h-8 w-8 text-gray-300" />
            <p className="text-sm text-gray-500 max-w-xs">
              Get AI-powered suggestions on where to cut down your emissions.
            </p>
            <Button
              onClick={handleAnalyze}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Analyze my footprint
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-3 rounded-lg bg-gray-50 px-4 py-3">
              <p className="text-sm text-gray-700">{recommendations.summary}</p>
              <Badge
                className={`${ratingStyles[recommendations.rating] || "bg-gray-100 text-gray-700"} shrink-0`}
              >
                {recommendations.rating}
              </Badge>
            </div>

            <Separator />

            <div className="space-y-3">
              {recommendations.recommendations.map((rec, i) => (
                <div key={i} className="rounded-lg border border-gray-100 p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                      {rec.category}
                    </span>
                    <Badge variant="secondary" className={impactStyles[rec.impact]}>
                      {rec.impact} impact
                    </Badge>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{rec.title}</p>
                  <p className="text-sm text-gray-600 mt-1">{rec.suggestion}</p>
                  {rec.estimatedSaving && (
                    <p className="text-xs text-emerald-600 mt-1.5 flex items-center gap-1">
                      <TrendingDown className="h-3 w-3" />
                      {rec.estimatedSaving}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}